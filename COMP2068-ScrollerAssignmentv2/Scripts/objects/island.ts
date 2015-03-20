﻿module objects {

    export class Island extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("island");

            this.name = "island";

            this._dy = 5;
            this.soundString = "yay";

            this._reset();
            
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        private _reset() {
            // set the island to start at a random x value
            this.x = Math.floor(Math.random() * constants.SCREEN_WIDTH);
            this.y = -this.height;
        }

        private _checkBounds() {
            if (this.y > (constants.SCREEN_HEIGHT + this.height)) {
                this._reset();
            }
        }


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++

        public update() {
            this.y += this._dy;

            this._checkBounds();
        }

        
    }

}  