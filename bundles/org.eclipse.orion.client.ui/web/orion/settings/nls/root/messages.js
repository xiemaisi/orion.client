/*******************************************************************************
 * @license
 * Copyright (c) 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 ******************************************************************************/
/*eslint-env browser, amd*/
define({//Default message bundle
	"Globalization": "Globalization",
	"Enable bidi support": "Enable bidi support",
	"Base text direction": "Base text direction",
	"Calendar type": "Calendar type",
	"Left-To-Right": "Left-To-Right",
	"Right-To-Left": "Right-To-Left",
	"Auto direction": "Auto direction",
	"Gregorian": "Gregorian",
	"Hebrew": "Hebrew",
	"Plugin Description": "Plug-in Description",
	"Create": "Create",
	"Loading...": "Loading...",
	"Label:": "Label:",
	"Title": "Title",
	"Plugins": "Plug-ins",
	"User Profile": "User Profile",
	"Git": "Git",
	"Git Settings": "Git Settings",
	"JavascriptAssist": "Tern",
	"Theme":"Editor Styles",
	"Editor Theme":"Editor Styles:",
	"Theme Settings": "Theme Settings",
	"General": "General",
	"desktopSelectionPolicy": "Desktop selection policy",
	"Navigation": "Navigation",
	"Font": "Font",
	"Family": "Family",
	"Sans Serif": "Sans Serif",
	"Serif": "Serif",
	"Size": "Size",
	"8pt": "8pt",
	"9pt": "9pt",
	"10pt": "10pt",
	"12pt": "12pt",
	"Color": "Color",
	"Background": "Background",
	"blue": "blue",
	"Weight": "Weight",
	"Normal": "Normal",
	"Bold": "Bold",
	"green": "green",
	"darkred": "darkred",
	"Categories": "Categories",
	"User Name": "User Name:",
	"Full Name": "Full Name:",
	"Email Address": "Email Address:",
	"Email Confirmed": "Email Confirmed:",
	"Account": "Account",
	"Current Password": "Current Password:",
	"New Password": "New Password:",
	"Verify Password": "Verify Password:",
	"UserSettings.PasswordsDoNotMatch": "New password, and retyped password do not match",
	"UserSettings.TypeCurrentPassword": "You must type your current password in order to set a new one",
	"UserSettings.InvalidPasswordLength": "Password must be at least 8 characters long",
	"UserSettings.InvalidPasswordAlpha": "Password must contain at least one alpha character and one non alpha character",
	"UserSettings.PasswordRules": "Password must be at least 8 characters long and contain at least one alpha character and one non alpha character",
	"Password": "Password",
	"Google": "Google",
	"Unlink": "Unlink",
	"Link": "Link",
	"Unlinked": "Unlinked",
	"Linked": "Linked",
	"Linked Accounts": "Linked Accounts",
	"Git Email Address": "Git Email Address:",
	"Git Username": "Git Username:",
	"Git Credentials Storage": "Git Credentials Storage",
	"Update": "Update",
	"Update Profile Settings": "Update Profile Settings",
	"Update Git User Settings": "Update Git User Settings",
	"Update Git Credentials": "Update Git Credentials",
	"UsrProfileUpdateSuccess": "User profile data successfully updated.",
	"GitUsrUpdateSuccess": "Git user data successfully updated.",
	"GitCredsUpdateSuccess": "Git Credentials successfully updated.",
	"Install Plugin": "Install Plug-in",
	"Plugin Name:": "Plug-in Name:",
	"Author Name:": "Author Name:",
	"Licence:": "Licence:",
	"Description:": "Description:",
	"OrionPlugin": "A plug-in for Orion",
	"Plugin Link": "Plug-in Link",
	"Install": "Install",
	"PlugInstallByURL": "Install a plug-in by specifying its URL",
	"Plugin URL:": "Plug-in URL:",
	"Disable": "Disable",
	"Disabled":"Disabled ${0}",
	"DisableTooltip": "Disable the plug-in",
	"Enable": "Enable",
	"Enabled":"Enabled ${0}",
	"EnableTooltip": "Enable the plug-in",
	"Reload all": "Reload all",
	"ReloadAllPlugs": "Reload all installed plug-ins",
	"CreatePlug": "Create a new Orion Plug-in",
	"FindMorePlugs": "Find More Orion Plug-ins",
	"Get Plugins": "Get Plug-ins",
	"Reload": "Reload",
	"ReloadPlug": "Reload the plug-in",
	"ReloadingPlugin": "Realoading plug-in",
	"ReloadingAllPlugins": "Realoading all plug-ins",
	"Delete": "Delete",
	"DeletePlugFromConfig": "Delete this plug-in from the configuration",
	"DeleteUser": "Delete User Profile as well as workspaces and projects",
	"DeleteUserComfirmation": "WARNING: This will permanently delete your user profile as well as all of your work!",
	"TypePlugURL": "Type a plug-in url here ...",
	"Already installed": "Already installed",
	"Installed":"Installed ${0}",
	"Installing":"Installing ${0}...",
	"Uninstalled":"Uninstalled ${0}",
	"UninstallCfrm":"Are you sure you want to uninstall '${0}'?",
	"ReloadedPlug":"Reloaded ${0} plug-in.",
	"ReloadedNPlugs":"Reloaded ${0} plug-ins.",
	"Reloaded":"Reloaded ${0}",
	"Services": "Services",
	"Value": "Value",
	"JavaScript Object": "JavaScript Object",
	"CheckJsConsoleDrillDown": "click here, then check javascript console to drill down",
	"Item": "Item",
	"Git Config": "Git Config",
	"GitWorkDir": "Git Working Directory",
	"SelectUnstagedChanges": "Always select changed files",
	"Clear Git Credentials": "Clear Git Credentials",
	"Enable Storage": "Enable Storage:",
	"BrowserCredStoreMsg": "Please be aware that your credentials will be stored persistently in the browser.",
	"AskEnableKeyStorage": "Do you wish to enable the Key Storage?",
	"general": "General",
	"validation": "Validation",
	"DeletedGitMsg": "Deleted git credentials for ${0}",
	"Editor": "Editor Settings",
	"editorSettings": "Editor Settings",
	"EditorThemes": "Editor Styles",
	"defaultImportedThemeName": "New Theme",
	"nameImportedTheme": "Please enter a name for this new theme:",
	"dndTheme": "Drag and drop here...",
	"textTheme": "...or paste editor styles here",
	"Import": "Import",
	"Import a theme": "Import a theme",
	"ImportThemeDialogMessage": "You can import a previously-exported Orion theme here. If you would like to import a Sublime Text, Brackets or an Eclipse theme, please see this <a href='https://wiki.eclipse.org/Orion/How_Tos/Import_Theme' target='_blank' tabindex='-1'>page</a>.",
	"ImportThemeError": "Ooops! The imported content does not appear to be a valid theme definition.",
	"Export": "Export",
	"Export a theme": "Export a theme",
	"Theme name:": "Theme name:",
	"yourTheme": "yourTheme",
	"fileManagement": "File Management",
	"typing": "Typing",
	"autoSave": "Auto Save:",
	"autoSaveTimeout": "Save interval (ms):",
	"autoLoad": "Auto Load:",
	"saveDiffs": "Save file as diffs:",
	"trimTrailingWhiteSpace": "Trim Trailing Whitespace on Save:",
	"Restore": "Restore Defaults",
	"Default": "Default",
	"keys": "Keys",
	"tabs": "Tabs",
	"tabSize": "Tab Size:",
	"expandTab": "Insert spaces for tabs:",
	"smoothScrolling": "Smooth Scrolling",
	"scrollAnimation": "Scrolling Animation:",
	"scrollAnimationTimeout": "Scrolling Duration (ms):",
	"keyBindings": "Key Bindings:",
	"rulers": "Rulers",
	"annotationRuler": "Show Annotation Ruler:",
	"lineNumberRuler": "Show Line Number Ruler:",
	"foldingRuler": "Show Folding Ruler:",
	"overviewRuler": "Show Overview Ruler:",
	"zoomRuler": "Show Code Map Ruler:",
	"whitespaces": "White Spaces",
	"wrapping": "Wrapping",
	"wordWrap": "Word Wrap:",
	"showMargin": "Show Margin:",
	"marginOffset": "Margin Column:",
	"showWhitespaces": "Show Whitespace Characters:",
	"autoSaveTimeoutInvalid": "Invalid save interval.",
	"scrollAnimationTimeoutInvalid": "Invalid scrolling duration.",
	"tabSizeInvalid": "Invalid tab size.",
	"localSettingsTooltip": "Toggle whether this setting is shown in the local editor settings drop down.",
	"editorSettingsInfo": "Use the ${0} and ${1} to toggle whether a given setting is shown in the local editor settings drop down ${2}.",
	"autoPairParentheses": "Autopair (Parentheses):",
	"autoPairBraces": "Autopair {Braces}:",
	"autoPairSquareBrackets": "Autopair [Square] Brackets:",
	"autoPairAngleBrackets": "Autopair <Angle> Brackets:",
	"autoPairQuotations": 'Autopair "Strings":',
	"autoCompleteComments": "Autocomplete /** Block Comments */:",
	"smartIndentation": "Smart Indentation:",
	"sourceControl": "Source Control",
	"showBlame": "Show Blame",
	"languageTools": "Language Tools",
	"showOccurrences": "Show Occurrences:",
	"contentAssistAutoTrigger": "Show Content Assist automatically:",
	"Editor preferences updated": "Editor preferences updated",
	"Editor defaults restored": "Editor defaults restored",
	"Font Size": "Font Size:",
	"New Theme Name:": "New Theme Name:",
	"Font Size:": "Font Size:",
	"Navigation Bar": "Navigation Bar",
	"Navigation Text": "Navigation Text",
	"Search Box": "Search Box",
	"Tool Panel": "Tool Panel",
	"Selection Bar": "Selection Bar",
	"Location": "Location",
	"Content": "Content",
	"Main Panel": "Main Panel",
	"Button": "Button",
	"Button Text": "Button Text",
	"Section Text": "Section Text",
	"Side Panel": "Side Panel",
	"Line Color": "Line Color",
	"Parameters": "Parameters",
	"Foreground": "Foreground",
	"Tags": "Tags",
	"Annotation Ruler": "Annotation Ruler",
	"Show Guide": "Show Guide",
	"Check Guide": "Check Guide",
	"Cancel": "Cancel",
	"Save Theme": "Save Theme",
	"Delete Theme": "Delete Theme",
	"Revert Theme": "Revert Theme",
	"Update Theme": "Update Theme",
	"clickDiagram": "Select a theme, or click elements in the diagram to style them individually.",
	"Property Names": "Property Names",
	"HexNumber": "Numbers (Hex)",
	"DecimalNumbers": "Numbers (Decimal)",
	"CSS Text": "CSS Text",
	"COLOR:": "Color:",
	"NEW COLOR:": "New Color:",
	"Ok": "Ok",
	"OR HEX:": "Or Hex: ",
	"pluginStatusNotLoaded": "This plug-in is not loaded.",
	"pluginStatusNotRunning": "This plug-in is disabled.",
	"pluginStatusBroken": "This plug-in could not be loaded.",
	"Website": "Website",
	"License": "License",
	"Login": "Login",
	'clearThemeAndEditorSettings.name': 'Clear themes and editor settings',
	'clearThemeAndEditorSettings.tooltip': 'Clear all settings associated with editor themes and window themes',
	"Settings": "Settings",
    "SettingUpdateSuccess": "${0} settings successfully updated.",
    "buttonSave": "Save",
    "buttonRevert": " Revert",
    "ConfirmRestore": "Restore these settings to their default values?",
    "Theme: ": "Theme: ",
    "Display Language: ": "Display Language: ",
    "cannotDeleteMsg": " is a default theme that cannot be deleted",
    "confirmDeleteMsg": "Are you sure you want to delete this theme?",
    "cannotModifyMsg": "${0} is a default theme that cannot be modified. Please use another name.",
    "settingsRestored": "Settings restored.",
    "editorTheme font size": "Font size",
    "editorTheme background": "Background",
    "editorTheme font color": "Font color",
    "editorTheme ruler background": "Ruler background",
    "editorTheme ruler color": "Ruler color",
    "editorTheme ruler border color": "Ruler border color",
    "editorTheme current line background": "Current line background",
    "editorTheme comment": "Comment",
    "editorTheme language variable": "Language variable",
    "editorTheme language constant": "Language constant",
    "editorTheme number": "Number",
    "editorTheme string": "String",
    "editorTheme entity": "Entity",
    "editorTheme keyword (control)": "Keyword (control)",
    "editorTheme keyword (operator)": "Keyword (operator)",
    "editorTheme function parameter": "Function parameter",
    "editorTheme comparison and logical operators": "Comparison and logical operators",
    "editorTheme write occurrence background": "Write occurrence background",
    "editorTheme matching bracket background": "Matching bracket background",
    "editorTheme matching search background": "Matching search background",
    "editorTheme current search background": "Current search background",
    "editorTheme documentation task color": "Documentation task color",
    "editorTheme property name color": "Property name color",
    "editorTheme tag": "Tag",
    "editorTheme tag attribute": "Tag attribute",
    "editorTheme selection background": "Selection background",
    'customizeTheme': 'Custom Style...',
    'moreEditorSettings': 'Editor Settings...'
    
});
