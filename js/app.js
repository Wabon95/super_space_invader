var app = {

    init: function() {
        app.invaderElement = document.getElementById('invader');
        var dataIdInvader = app.invaderElement.dataset.id;
        app.navElement = document.querySelector('.select-model');
        app.addNavigation();
        app.displayInvader('squid');
    },

    addNavigation: function() {
        var modelsList = Object.keys(map.models);
        for(var modelIndex in modelsList) {
            app.addButton(modelsList[modelIndex]);
        }
    },

    addButton: function(buttonName) {
        // On creer le bouton et ses class
        var buttonElement = document.createElement('button');
        buttonElement.classList.add('btn', 'btn-dark', 'mx-2');

        // On défini le contenu du bouton dynamiquement grâce au paramètre buttonName
        var textNode = document.createTextNode(buttonName);
        buttonElement.appendChild(textNode);
        buttonElement.dataset.name = buttonName.replace(/ /g,"_"); // .replace permet de convertir les " " en "_"

        // On rajoute l'appel à la bonne fonction lors d'un click sur ce bouton
        buttonElement.addEventListener('click', app.handleButtonClick);

        app.navElement.appendChild(buttonElement);
    },
    
    handleButtonClick: function(evt) {
        app.displayInvader(evt.currentTarget.dataset.name);
    },

    // Permet de vider le contenu de la div contenant un invader
    emptyElement: function(element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
    },

    displayInvader: function(invaderName) {
        app.emptyElement(app.invaderElement);
        var invader = map.models[invaderName];
        var nbrCharacters = invader[0].length;
        app.invaderElement.style.width = 'calc(' + nbrCharacters + ' * 1.25rem)';

        var currentLine, currentCharacter;
        for(var currentIndex in invader) {
            currentLine = invader[currentIndex];
            for(var currentCharacterIndex in currentLine) {
                currentCharacter = currentLine[currentCharacterIndex];
                app.drawCharacter(currentCharacter);
            }
        }
    },

    drawCharacter: function(character) {
        var className = '';
        switch (character) {
            case '-' :
                className = 'pixel--empty';
                break;
            case 'x' :
                className = 'pixel--plain';
                break;
            case 'o':
                className = 'pixel--light';
                break;
            case '8':
                className = 'pixel--highlight';
                break;
        }

        var pixelElement = document.createElement('div'); // Je crée l'élément div
        var textNode = document.createTextNode(character);
        pixelElement.appendChild(textNode); // J'attache le texte à l'élément
        pixelElement.classList.add('pixel', className); // J'ajoute les classes à l'élément
        app.invaderElement.appendChild(pixelElement); // J'ajoute l'élément dans le DOM
    },
}
document.addEventListener('DOMContentLoaded', app.init);