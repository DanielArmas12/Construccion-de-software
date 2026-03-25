/*
 * Basic implementation of the Breakout game
 *
 * Daniel Armas
 * 2026-03-24
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

let paddleSpeed = 0.5;
let ballSpeed = 0.5;

// Class for the game ball
class Ball extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "ball", sheetCols);
        this.velocity = new Vector(0, 0);
    }

    update(deltaTime) {
        this.velocity = this.velocity.normalize().times(ballSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    reset() {
        this.position = new Vector(canvasWidth/2, canvasHeight -50);
        this.velocity = new Vector(0, 0);
        ballSpeed=0.5;
    }

    serve() {
        // Get a random angle
        let angle = -Math.PI/4 - (Math.random() * Math.PI / 2);
        // Convert the angle into a cartesian vector
        this.velocity.x = Math.cos(angle);
        this.velocity.y = Math.sin(angle);
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0, 0);

        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // TODO: Normalize the velocity to avoid greater speed on diagonals

        this.velocity = this.velocity.normalize().times(paddleSpeed);

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
    }

    clampWithinCanvas() {
        // Top border
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        // Left border
        }
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        // Bottom border
        }
        if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
        // Right border
        }
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        // Add audio element
        this.ping = document.createElement("audio");
        this.ping.src = "../assets/audio/4387__noisecollector__pongblipe4.wav";

        // Variables to keep score of the game
        this.points = 0;
        this.lives = 3;
        this.status="playing";
        this.count=0;
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets/sprites/Parallax100.png");

        this.paddle = new Paddle(new Vector(canvasWidth/2, canvasHeight),
                                 200, 20, "red");

        this.ball = new Ball(new Vector(canvasWidth/2, canvasHeight -50),
                                20, 20, "white");

        this.barrierTop = new GameObject(new Vector(canvasWidth / 2, 0), canvasWidth, 20);
        this.barrierBottom = new GameObject(new Vector(canvasWidth / 2, canvasHeight), canvasWidth, 20);
        this.barrierLeft = new GameObject(new Vector(0, canvasHeight / 2), 20, canvasHeight);
        this.barrierRight = new GameObject(new Vector(canvasWidth, canvasHeight / 2), 20, canvasHeight);

        this.heart = new GameObject(new Vector(0,0), 30, 30);
        this.heart.setSprite("../assets/sprites/heart.png");

        this.actors=[];
        // Labels to show the score of each player
        this.pointsText = new TextLabel(canvasWidth / 2, 60, "40px Ubuntu Mono", "white");
        this.addBox();

    }

    draw(ctx) {
        // Draw the background first, so everything else is drawn on top
        this.background.draw(ctx);

        if(this.status=="playing"){
            this.paddle.draw(ctx);

            this.pointsText.draw(ctx, this.points);

            this.ball.draw(ctx);

            for (let i=0; i<this.lives; i++) {
                this.heart.position = new Vector(30 + i * 35, 30);
                this.heart.draw(ctx);
            }

            for (let actor of this.actors) {
                if(actor.destroy!=true){
                actor.draw(ctx);
             }
         }

        }
        if(this.status=="win"){
            ctx.fillText("YOU WIN", canvasWidth/3, canvasHeight/2);
        }

        if(this.status=="lose"){
            ctx.fillText("Game Over", canvasWidth/3, canvasHeight/2);
        }
    }

    update(deltaTime) {
        // Move the paddleLeft
        this.paddle.update(deltaTime);

        this.ball.update(deltaTime);

        if(this.status!="playing"){
            return;
        }

        if (boxOverlap(this.ball, this.barrierTop)) {
            this.ball.velocity.y *= -1;
            // Make the ball faster with every contact
            this.ball.velocity=this.ball.velocity.times(1.1);
        }
        if (boxOverlap(this.ball, this.barrierLeft) || boxOverlap(this.ball, this.barrierRight)) {
            this.ball.velocity.x *= -1;
            // Make the ball faster with every contact
            this.ball.velocity=this.ball.velocity.times(1.1);
        }
        if (boxOverlap(this.ball, this.paddle)) {
            let distanciax=this.paddle.position.x-this.ball.position.x;
            let distanciay=this.paddle.position.y-this.ball.position.y;
            let sobrepuestoX=this.ball.halfSize.x+this.paddle.halfSize.x-Math.abs(distanciax);
            let sobrepuestoY=this.ball.halfSize.y+this.paddle.halfSize.y-Math.abs(distanciay);
            if(sobrepuestoX<sobrepuestoY){
                this.ball.velocity.x *=-1;
            }
            else{
                this.ball.velocity.y *=-1;
            }
            // Make the ball faster with every contact
            this.ball.velocity=this.ball.velocity.times(1.1);
            // Play the sound
            this.ping.play();
        }

        if (boxOverlap(this.ball, this.barrierBottom)) {
            this.lives-=1;
            this.ball.reset();
        }
        if(this.lives==0){
            this.status="lose";
        }
        // Check collision against other objects
        for (let actor of this.actors) {
            if (actor.destroy) continue;
            if (boxOverlap(this.ball, actor)) {
                actor.destroy = true;
                this.count+=1;
                this.points += 1;
                let distancex=this.ball.position.x-actor.position.x;
                let distancey=this.ball.position.y-actor.position.y;
                let overlapX=actor.halfSize.x+this.ball.halfSize.x-Math.abs(distancex);
                let overlapY=actor.halfSize.y+this.ball.halfSize.y-Math.abs(distancey);
                
                if(this.count % 10==0){
                    console.log(this.paddle.scale);
                    if(this.paddle.scale>0.4){
                        this.paddle.scale *= 0.9;
                        this.paddle.size.x *= 0.9;
                        this.paddle.halfSize.x = this.paddle.size.x / 2;
                        console.log(this.paddle.scale);
                    }
                    if(ballSpeed<1.5){
                        ballSpeed += 0.1;
                    }
                }

                if (overlapX<overlapY) {
                    this.ball.velocity.x *=-1;
                } 
                else {
                    this.ball.velocity.y*=-1;
                }

                // Play the sound
                this.ping.play();
                break;

        }
    }
        if(this.lives>0 && this.count==50){
            this.status="win";
        }
}

    addBox() {
        const rows=5;
        const cols=10;
        const spacing=5;
        const boxWidth=60;
        const boxHeight=20;
        for (let row=0;row< rows;row++) {
            for (let col=0;col<cols;col++) {
                const posX=col*(boxWidth+spacing)+100;
                const posY=row*(boxHeight+spacing)+100;
                const box = new GameObject(new Vector(posX, posY), boxWidth, boxHeight);
        box.setSprite("../assets/sprites/brick.png");
        // Set a property to indicate if the box should be destroyed or not
        box.destroy = false;
        this.actors.push(box);
        }
    }
}

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowLeft') {
                this.addKey('left', this.paddle);
            } else if (event.key == 'ArrowRight') {
                this.addKey('right', this.paddle);
            }

            // Add a key for the initial serve of the ball
            if (event.code == 'Space') {
                if(this.status=="win" || this.status=="lose"){
                    this.ball.serve();
                }
                if(this.ball.velocity.x==0 && this.ball.velocity.y==0){
                    this.ball.serve();
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'ArrowLeft') {
                this.delKey('left', this.paddle);
            } else if (event.key == 'ArrowRight') {
                this.delKey('right', this.paddle);
            }
        });
    }

    addKey(direction, paddle) {
        if (!paddle.keys.includes(direction)) {
            paddle.keys.push(direction);
        }
    }

    delKey(direction, paddle) {
        if (paddle.keys.includes(direction)) {
            paddle.keys.splice(paddle.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
