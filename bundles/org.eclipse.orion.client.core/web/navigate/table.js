/*******************************************************************************
 * @license
 * Copyright (c) 2010, 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global define document dojo dijit window eclipse orion serviceRegistry:true widgets alert*/
/*browser:true*/

define(['dojo', 'dijit', 'orion/bootstrap', 'orion/selection', 'orion/status', 'orion/progress', 'orion/dialogs',
        'orion/ssh/sshTools', 'orion/commands', 'orion/favorites', 'orion/tasks', 'orion/navoutliner', 'orion/searchClient', 'orion/fileClient', 'orion/operationsClient', 'orion/globalCommands',
        'orion/fileCommands', 'orion/explorer-table', 'orion/util', 'orion/PageUtil','orion/contentTypes',
        'dojo/parser', 'dijit/layout/BorderContainer', 'dijit/layout/ContentPane', 'orion/widgets/eWebBorderContainer'], 
		function(dojo, dijit, mBootstrap, mSelection, mStatus, mProgress, mDialogs, mSsh, mCommands, mFavorites, mTasks, mNavOutliner,
				mSearchClient, mFileClient, mOperationsClient, mGlobalCommands, mFileCommands, mExplorerTable, mUtil, PageUtil, mContentTypes) {

dojo.addOnLoad(function(){
	mBootstrap.startup().then(function(core) {
		var serviceRegistry = core.serviceRegistry;
		var preferences = core.preferences;
		var selection = new mSelection.Selection(serviceRegistry);
		var operationsClient = new mOperationsClient.OperationsClient(serviceRegistry);
		new mStatus.StatusReportingService(serviceRegistry, operationsClient, "statusPane", "notifications", "notificationArea");
		new mProgress.ProgressService(serviceRegistry, operationsClient);
		new mDialogs.DialogService(serviceRegistry);
		new mSsh.SshService(serviceRegistry);
		new mFavorites.FavoritesService({serviceRegistry: serviceRegistry});
		var commandService = new mCommands.CommandService({serviceRegistry: serviceRegistry, selection: selection});
		
		// Git operations
		//new eclipse.GitService(serviceRegistry);
		
		var treeRoot = {
			children:[]
		};
		var fileClient = new mFileClient.FileClient(serviceRegistry);
		var searcher = new mSearchClient.Searcher({serviceRegistry: serviceRegistry, commandService: commandService, fileService: fileClient});
					
//		var fileServices = serviceRegistry.getServiceReferences("orion.core.file");

		var contentTypeService = new mContentTypes.ContentTypeService(serviceRegistry);
		var explorer = new mExplorerTable.FileExplorer({serviceRegistry: serviceRegistry, treeRoot: treeRoot, selection: selection, searcher: searcher, 
				fileClient: fileClient, commandService: commandService, contentTypeService: contentTypeService,
				parentId: "explorer-tree", breadcrumbId: "location", toolbarId: "pageActions", selectionToolsId: "selectionTools", preferences: preferences});
		
		function refresh() {
			var pageParams = PageUtil.matchResourceParameters();
			explorer.loadResourceList(pageParams.resource, false, function() {
				mGlobalCommands.setPageTarget(explorer.treeRoot, serviceRegistry, commandService, null, /* favorites target */explorer.treeRoot);
				var isAtRoot = mUtil.isAtRoot(explorer.treeRoot.Location) ;
				if (isAtRoot && !dojo.byId("gettingStartedTasks")) {
					// TODO eventually we may expose an extension point or this, but right now we don't have a good story for 
					// how a plugin can add content to the workspace.  So we have only internal/canned creation tasks.
					var tasks = [
						{commandId: "orion.new.template"},
						{commandId: "orion.new.sftp"},
						{commandId: "orion.new.zip"},
						{commandId: "orion.new.gitclone"},
						{commandId: "orion.new.project"}
					];
					// Add the getting started task list.  Keep it collapsed unless there is no workspace content.
					// We want project creation commands to always be valid from the task list (even if the explorer root is not the workspace.)
					// So the item we pass into the task list for validating commands is a fake object that pretends to be the workspace.
					new mTasks.TaskList({parent: "gettingStarted", id: "gettingStartedTasks", title: "Create new content", 
						description: "Click one of the tasks below to create an Orion folder.  You can upload, import, or generate files.",
						tasks: tasks, serviceRegistry: serviceRegistry, commandService: commandService, item: {Location: "/workspace"}, handler: explorer, collapsed: false});
				} else {
					dojo.empty("gettingStarted");
				}
			});
		}
	
		var navOutliner = new mNavOutliner.NavigationOutliner({parent: "favorites", serviceRegistry: serviceRegistry});
							
		// global commands
		mGlobalCommands.setPageCommandExclusions(["eclipse.openWith", "orion.navigateFromMetadata"]);
		mGlobalCommands.generateBanner("banner", serviceRegistry, commandService, preferences, searcher, explorer);
		// commands shared by navigators
		mFileCommands.createFileCommands(serviceRegistry, commandService, explorer, fileClient, "pageActions", "selectionTools");
		
		// navigator-specific commands
		var toggleOutlineCommand = new mCommands.Command({
			name: "Toggle Left Pane",
			tooltip: "Open or close the left pane",
			id: "eclipse.toggleSplitter",
			callback: function() {
				var splitArea = dijit.byId("eclipse.navigate-table");
				splitArea.toggle();}
		});
		commandService.addCommand(toggleOutlineCommand);
				
		// define the command contributions - where things appear, first the groups
		commandService.addCommandGroup("pageActions", "orion.new", 1000, "New");
		commandService.addCommandGroup("pageActions", "orion.gitGroup", 200);
		commandService.addCommandGroup("selectionTools", "orion.selectionGroup", 500, "More");
		commandService.addCommandGroup("selectionTools", "orion.importExportGroup", 100, null, "orion.selectionGroup");		
		commandService.addCommandGroup("selectionTools", "orion.newResources", 101, null, "orion.selectionGroup");
		// commands that don't appear but have keybindings
		commandService.registerCommandContribution("pageActions", "eclipse.toggleSplitter", 1, null, true, new mCommands.CommandKeyBinding('o', true));
		commandService.registerCommandContribution("pageActions", "eclipse.copySelections", 1, null, true, new mCommands.CommandKeyBinding('c', true));
		commandService.registerCommandContribution("pageActions", "eclipse.pasteSelections", 1, null, true, new mCommands.CommandKeyBinding('v', true));
		
		// commands appearing in nav tool bar
		commandService.registerCommandContribution("pageActions", "eclipse.openResource", 500);
		
		//new file and new folder in the nav bar do not label the group (we don't want a menu)
		commandService.registerCommandContribution("pageActions", "eclipse.newFile", 1);
		commandService.registerCommandContribution("pageActions", "eclipse.newFolder", 2, null, false, null, new mCommands.URLBinding("newFolder", "name"));
		commandService.registerCommandContribution("pageActions", "eclipse.upFolder", 3, null, true, new mCommands.CommandKeyBinding(38, false, false, true));
		// new project creation in the toolbar (in a group)
		commandService.registerCommandContribution("pageActions", "orion.new.project", 1, "orion.new");
		commandService.registerCommandContribution("pageActions", "orion.new.zip", 2, "orion.new");
		commandService.registerCommandContribution("pageActions", "orion.new.sftp", 3, "orion.new");
		commandService.registerCommandContribution("pageActions", "orion.new.template", 4, "orion.new");
		commandService.registerCommandContribution("pageActions", "orion.new.linkProject", 5, "orion.new");
	
		// selection based command contributions in nav toolbar
		commandService.registerCommandContribution("selectionTools", "orion.makeFavorite", 1, "orion.selectionGroup");
		commandService.registerCommandContribution("selectionTools", "eclipse.renameResource", 2, "orion.selectionGroup", false, new mCommands.CommandKeyBinding(113, false, false, false, false, "explorer-tree"));
		commandService.registerCommandContribution("selectionTools", "eclipse.copyFile", 3, "orion.selectionGroup");
		commandService.registerCommandContribution("selectionTools", "eclipse.moveFile", 4, "orion.selectionGroup");
		commandService.registerCommandContribution("selectionTools", "eclipse.deleteFile", 5, "orion.selectionGroup", false, new mCommands.CommandKeyBinding(46, false, false, false, false, "explorer-tree"));
		commandService.registerCommandContribution("selectionTools", "eclipse.importCommand", 1, "orion.selectionGroup/orion.importExportGroup");
		commandService.registerCommandContribution("selectionTools", "eclipse.downloadFile", 2, "orion.selectionGroup/orion.importExportGroup");
		commandService.registerCommandContribution("selectionTools", "eclipse.importSFTPCommand", 3, "orion.selectionGroup/orion.importExportGroup");
		commandService.registerCommandContribution("selectionTools", "eclipse.exportSFTPCommand", 4, "orion.selectionGroup/orion.importExportGroup");
			
		mFileCommands.createAndPlaceFileCommandsExtension(serviceRegistry, commandService, explorer, "pageActions", "selectionTools", "orion.selectionGroup");

		// when new item is fetched, display it in the page title
		dojo.connect(explorer, "onchange", function(item) {
			var title = "Navigator";
			if (item) {
				var name = mUtil.isAtRoot(item.Location) ? fileClient.fileServiceName(item.Location) : item.Name;
				if (name) {
					title = "/" + name + " - " + title;
				}
			}
			document.title = title;
		});

		//every time the user manually changes the hash, we need to load the workspace with that name
		dojo.subscribe("/dojo/hashchange", explorer, function() {
			refresh();
		});
		refresh();

		document.body.style.visibility = "visible";
		dojo.parser.parse();
	});
});

});
