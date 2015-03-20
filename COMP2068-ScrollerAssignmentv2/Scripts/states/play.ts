/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/island.ts" />
/// <reference path="../objects/hallway.ts" />
/// <reference path="../objects/plane.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/scoreboard.ts" />


module states {
    // PLAY STATE
    export class Play {
        // INSTANCE VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++
        public game: createjs.Container;
        public plane: objects.Plane;
        public island: objects.Island;
        public clouds: objects.Cloud[] = [];
        public hallway: objects.Hallway;
        public scoreboard: objects.ScoreBoard;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            // Add ocean to game
            this.hallway = new objects.Hallway();
            this.game.addChild(this.hallway);


            // Add island to game
            this.island = new objects.Island();
            this.game.addChild(this.island);


            // Add plane to game
            this.plane = new objects.Plane();
            this.game.addChild(this.plane);

            // Add clouds to game
            for (var cloud = constants.CLOUD_NUM; cloud > 0; cloud--) {
                this.clouds[cloud] = new objects.Cloud();
                this.game.addChild(this.clouds[cloud]);
            }

            this.scoreboard = new objects.ScoreBoard(this.game);



            stage.addChild(this.game);
        } // constructor end


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++

        // Calculate the distance between two points
        distance(p1: createjs.Point, p2: createjs.Point): number {

            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } // distance end

        // CHeck Collision Method
        checkCollision(collider: objects.GameObject) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.plane.x;
            p1.y = this.plane.y;
            p2.x = collider.x;
            p2.y = collider.y;
            // Check for Collision
            if (this.distance(p2, p1) < ((this.plane.height * 0.5) + (collider.height * 0.5))) {
                if (!collider.isColliding) { // Collision has occurred
                    createjs.Sound.play(collider.soundString);
                    collider.isColliding = true;
                    switch (collider.name) {
                        case "island":
                            this.scoreboard.score += 100;
                            break;
                        case "cloud":
                            this.scoreboard.lives--;
                            break;
                    }
                }
            } else {
                collider.isColliding = false;
            }
    } // checkCollision end

        // UPDATE METHOD
        public update() {

            this.hallway.update();
            this.plane.update();
            this.island.update();

            if (this.scoreboard.lives > 0) {
                for (var cloud = constants.CLOUD_NUM; cloud > 0; cloud--) {
                    this.clouds[cloud].update();
                    this.checkCollision(this.clouds[cloud]);
                }

                this.checkCollision(this.island);
            }

            this.scoreboard.update();

            if (this.scoreboard.lives < 1) {
                createjs.Sound.stop();
                this.game.removeAllChildren();
                stage.removeAllChildren();
                finalScore = this.scoreboard.score;
                if (finalScore > highScore) {
                    highScore = finalScore;
                }
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }
        } // update method end


    }
} 