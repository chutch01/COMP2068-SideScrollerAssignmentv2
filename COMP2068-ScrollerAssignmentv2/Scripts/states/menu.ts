﻿/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/enemy.ts" />
/// <reference path="../objects/ball.ts" />
/// <reference path="../objects/hallway.ts" />
/// <reference path="../objects/samus.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/scoreboard.ts" />


module states {
    // MENU STATE
    export class Menu {
        // INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public hallway: objects.Hallway;
        public playButton: objects.Button;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            createjs.Sound.play("title", { loop: -1 });
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add ocean to game
            this.hallway = new objects.Hallway();
            this.game.addChild(this.hallway);

            var mailPilotLabel: objects.Label = new objects.Label("MAIL PILOT", constants.SCREEN_CENTER_WIDTH, 100);
            mailPilotLabel.font = "80px Consolas";
            mailPilotLabel.regX = mailPilotLabel.getMeasuredWidth() * 0.5;
            mailPilotLabel.regY = mailPilotLabel.getMeasuredHeight() * 0.5;
            this.game.addChild(mailPilotLabel);

            this.playButton = new objects.Button("playButton", constants.SCREEN_CENTER_WIDTH, 400);
            this.game.addChild(this.playButton);
            this.playButton.on("click", this.playButtonClicked, this);


            stage.addChild(this.game);
        } // constructor end


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++
        playButtonClicked() {
            this.game.removeAllChildren();
            createjs.Sound.stop();
            stage.removeChild(this.game);
            currentState = constants.PLAY_STATE;
            stateChanged = true;
        }

        // UPDATE METHOD
        public update() {

            this.hallway.update();

        } // update method end


    }
}   