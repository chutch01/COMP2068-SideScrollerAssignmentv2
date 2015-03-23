module objects {

    export class Ball extends objects.GameObject {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            super("ball");

            this.name = "ball";

            this._dx = 5;
            this.soundString = "randomize";

            this._reset();
            
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++
        private _reset() {
            // set the island to start at a random x value
            this.y = Math.floor(Math.random() * constants.SCREEN_HEIGHT);
            this.x = Math.floor(Math.random() * constants.SCREEN_HEIGHT) + constants.SCREEN_WIDTH;
        }

        private _checkBounds() {
            if (this.x < 0 - this.width) {
                this._reset();
            }
        }


        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++

        public update() {
            this.x -= this._dx;

            this._checkBounds();
        }
        public hit() {
        }

        
    }

}  