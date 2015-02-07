/*******************************************************************************
 * Copyright (c) 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*eslint-env node */
var api = require('../api'), writeError = api.writeError;
var git = require('nodegit');
var finder = require('findit');
var path = require("path");

function getStatus(workspaceDir, fileRoot, req, res, next, rest) {				
		var status = new Array();
		var repoPath = rest.replace("status/file/", "");
		repoPath = api.join(workspaceDir, repoPath);
		git.Repository.open(repoPath)
		.then(function(repo) {
			finder(repoPath).on('file', function (file, stat) {
				var num = 1;
				console.log(file.replace(workspaceDir,"."));
				console.log(repo);
				git.Status.file(num, repo, file.replace(workspaceDir,"."));
			})
				
		});
}

module.exports = {
	getStatus: getStatus
};