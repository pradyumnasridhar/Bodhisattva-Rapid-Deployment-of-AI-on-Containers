(function(window, undefined) {
  var dictionary = {
    "0863e7fa-24da-4c50-88eb-13785dc8c68f": "SpecifyTrainingData",
    "95c48485-f8a1-47cc-9e2c-2ea4f8f4a671": "SpecifyModelParameters",
    "7569ddac-9da2-4565-9a81-35e66a4912bb": "SpecifyBasicDetails",
    "a9232e77-ea56-4d0f-8b94-ef15f26571f2": "SpecifyHyperparameters",
    "293976c7-398f-424e-90e5-b5ea7913eff3": "AvailableBasicModels",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "MLWizardLandingPage",
    "21b0d7e3-b210-4023-b868-19cefdb0ee7d": "ModelTraining",
    "6e09c3a2-1edb-4538-a7c7-d50c64d3ef12": "MakePredictions",
    "e73b655d-d3ec-4dcc-a55c-6e0293422bde": "960 grid - 16 columns",
    "ef07b413-721c-418e-81b1-33a7ed533245": "960 grid - 12 columns",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);