/*******************************************************************************
 * @license
 * Copyright (c) 2014, 2015 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 ******************************************************************************/
/* eslint-env amd */
define({//Default message bundle
    'pluginName': 'Orion JavaScript Tool Support',
    'pluginDescription': 'This plugin provides JavaScript tools support for Orion, like editing, search, navigation, validation, and code completion.',
	'error': 'Error',
	'warning' : 'Warning',
	'ignore' : 'Ignore',
	'ternContentAssist' : 'Tern JavaScript content assist',
	'prefCodeStyle':'Code Style',
	'prefBestPractices':'Best Practices',
	'prefPotentialProblems':'Potential Programming Problems',
	'sourceOutline' : 'Source Outline',
	'sourceOutlineTitle': 'JavaScript source outline',
	'contentAssist' : 'JavaScript content assist',
	'eslintValidator' : 'JavaScript Validator',
	'missingCurly' : 'Statements not enclosed in braces:',
	'noCaller' : 'Discouraged \'arguments.caller\' or \'arguments.callee\' use:',
	'noCommaDangle' : 'Trailing commas in object expressions:',
    'noCondAssign' : 'Assignments in conditional expressions:',
    'noConsole' : 'Discouraged console use in browser code:',
    'noConstantCondition' : 'Constant as conditional expression:',
    'noRegexSpaces' : 'Multiple spaces in regular expressions:',
    'noReservedKeys' : 'Reserved words used as property keys:',
    'noReservedKeysFixName': 'Surround key with quotes',
	'noEqeqeq' : 'Discouraged \'==\' use:',
	'noDebugger' : 'Discouraged \'debugger\' statement use:',
	'noWith': 'Discouraged \'with\' statement use:',
	'noEval' : 'Discouraged \'eval()\' use:',
	'noImpliedEval' : 'Discouraged implied \'eval()\' use:',
	'noDupeKeys' : 'Duplicate object keys:',
	'noIterator': 'Discouraged __iterator__ property use:',
	'noProto': 'Discouraged __proto__ property use:',
	'noUndefInit': 'Explicitly initializing variables to undefined:',
	'useIsNaN' : 'NaN not compared with isNaN():',
	'useIsNanFixName': 'Use isNaN()',
	'missingDoc' : 'Missing JSDoc:',
	'noUnreachable' : 'Unreachable code:',
	'noFallthrough' : 'Switch case fall-through:',
	'useBeforeDefine' : 'Member used before definition:',
	'noEmptyBlock' : 'Undocumented empty block:',
	'newParens' : 'Missing parentheses in constructor call:',
	'noNewArray': 'Discouraged \'new Array()\':',
	'noNewFunc': 'Discouraged \'new Function()\':',
	'noNewObject': 'Discouraged \'new Object()\':',
	'noNewWrappers': 'Discouraged wrapper objects:',
	'missingSemi' : 'Missing semicolons:',
	'unusedVars' : 'Unused variables:',
	'varRedecl' : 'Variable re-declarations:',
	'varShadow': 'Variable shadowing:',
	'undefMember' : 'Undeclared global reference:',
	'unnecessarySemis' : 'Unnecessary semicolons:',
	'unusedParams' : 'Unused parameters:',
	'unsupportedJSLint' : 'Unsupported environment directive:',
	'noThrowLiteral': 'Literal used in \'throw\':',
	'missingNls': 'Non-externalized string literals (missing $NON-NLS$ tag):',
	'generateDocName' : 'Generate Element Comment',
	'generateDocTooltip' : 'Generate a JSDoc-like comment for the selected JavaScript element',
	'renameElement' : 'Rename Element',
	'renameElementTooltip' : 'Rename the selected JavaScript element',
	'openDeclName' : 'Open Declaration',
	'openDeclTooltip' : 'Open the declaration of the selected element',
	'validTypeof': 'Invalid \'typeof\' comparison',
	'noSparseArrays': 'Sparse array declarations',
	'javascriptValidation': 'Javascript Validation',
	'jsHover': 'JavaScript Hover Provider',
	'removeExtraSemiFixName': 'Remove extra semicolon',
	'addFallthroughCommentFixName': 'Add $FALLTHROUGH$ comment',
	'addEmptyCommentFixName': 'Comment empty block',
	'addESLintEnvFixName': 'Add to eslint-env directive',
	'addESLintGlobalFixName': 'Add to globals directive',
	'removeUnusedParamsFixName': 'Remove parameter',
	'commentCallbackFixName': 'Add @callback to function',
	'eqeqeqFixName': 'Update operator',
	'unreachableFixName': 'Remove unreachable code',
	'sparseArrayFixName': 'Convert to normal array',
	'semiFixName': 'Add missing \';\'',
	'radix': 'Missing radix parameter to parseInt()',
	'unusedVarsUnusedFixName': 'Remove unused variable',
	'unusedFuncDeclFixName': 'Remove unused function',
	'noCommaDangleFixName': 'Remove extra \',\'',
	'addBBreakFixName': 'Add break statement',
	'addBBreakFixTooltip': 'Add a break statement to the proceeding line',
	'noShadowGlobals': 'Global shadowing:',
	'noThrowLiteralFixName': 'Change to Error' ,
	'missingNlsFixName': 'Add missing $NON-NLS$ tag',
	'funcProposalDescription': ' - The name of the function',
	'funcParamProposalDescription': ' - Function parameter',
	'eslintRuleProposalDescripton': ' - ESLint rule',
	'eslintEnvProposalDescription': ' - ESLint environment name',
	'onlineDocumentationProposalEntry': '\n\n[Online documentation](${0})',
	'keywordProposalDescription': ' - Keyword',
	'keywordHoverProposal': 'ECMAScript reserved keyword',
	'reloadPluginCmd': 'Reload',
	'reloadPluginCmdTooltip': 'Reload plug-in',
	'reloadAllPluginsCmd': 'Reload All',
	'reloadAllPluginsCmdTooltip': 'Reload all plug-ins',
	'ternPlugins': 'Tern Plugins',
	'noTernPluginsAvailable': 'No Tern plug-ins are currently loaded. This may be because you have not yet activated content assist in a JavaScript file. Tern plug-ins provide type information and code templates for JavaScript.',
	'noDeclFound': 'No declaration was found to navigate to.',
	"deprecatedHoverTitle": "Deprecated.", // the in-line title for deprecated memebers. The word is used alone in a sentence with no further punctuation
	"parametersHoverTitle": "Parameters:", // the in-line title for the parameters section. The word is used alone in a sentence with no further punctuation
	"returnsHoverTitle": "Returns:", // the in-line title for the returns section. The word is used alone in a sentence with no further punctuation
	"throwsHoverTitle": "Throws:", // the in-line title for the throws section. The word is used alone in a sentence with no further punctuation
	"callbackHoverTitle": "Callback:", // the in-line title for the callback section. The word is used alone in a sentence with no further punctuation
	"sinceHoverTitle": "Since:", // the in-line title for the since section. The word is used alone in a sentence with no further punctuation
	"seeAlsoHoverTitle": "See Also:", // the in-line title for the since section. The word is used alone in a sentence with no further punctuation
	"openFileForTitle": "Open file for" // the in-line title for the 'open file hover'. The sentence is used as-is and is followed only by a OS file path
});
