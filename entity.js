class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this); // add to scene
        this.scene.physics.world.enableBody(this, 0); // instantiate to rendering queue
        this.setData("type", type);
        this.setData("isDead", false);
    }
}

class Hook extends Entity {
    constructor(scene)
    {
        super(scene, 320, 240, 'hook');
        this.setImmovable();
        this.setCircle(20, -10, 400);

        this.fish = null;

        scene.input.on('pointermove', function(pointer) {
            this.y = Phaser.Math.Clamp(pointer.y - 180, -50, 500);
            if (this.hasFish())
                this.setFishY();
        }, this);
        scene.input.on('pointerdown', function(pointer) 
        {
            scene.letFishGo();  
        }, this);
        
    }

    // returns true if there is fish on hook
    hasFish() {
        return this.fish != null;
    }

    setFishY() { this.fish.y = Phaser.Math.Clamp(this.y + 200, -50, 500);}

    addFish(fish) {
        this.fish = fish;
        this.fish.setVelocity(0);
        this.fish.x = 320;
        this.setFishY(fish);
        this.fish.angle = -90;
    }

    removeFish(isCaught) {
        if (isCaught) {
            this.fish.destroy();
        } else {
            this.fish.flee();
        }
        this.fish = null;
    }
}


class Fish extends Entity {
    constructor(scene, x, y, image) 
    {
        super(scene, x, y, image);
        this.size;
    }

    update() {
        if (this.x > 640) {
            this.destroy();
        }
    }

    // play running away animation >> tween + anim >> bottom edge of screen >> destroy
    flee() {
        console.log("IM FREEEEEE");
        this.destroy();
    }
}

class SmallFish extends Fish {
    constructor(scene) {
        var x = Phaser.Math.Between(-100, -10);
        var y = Phaser.Math.Between(150, 470);
        super(scene, x, y, 'small');
        var speed = Phaser.Math.Between(70, 100);
        this.setVelocity(speed, 0);
        this.size = fishSize.SMALL;
        this.setCircle(10, 40, 0);
    }
}

class MediumFish extends Fish {
    constructor(scene) {
        var x = Phaser.Math.Between(-100, -20);
        var y = Phaser.Math.Between(200, 470);
        super(scene, x, y, 'medium');
        var speed = Phaser.Math.Between(50, 70);
        this.setVelocity(speed, 0);
        this.size = fishSize.MEDIUM;
        this.setCircle(15, 120, 0);
    }
}

class BigFish extends Fish {
    constructor(scene) {
        var x = Phaser.Math.Between(-100, -40);
        var y = Phaser.Math.Between(200, 470);
        super(scene, x, y, 'big');
        var speed = Phaser.Math.Between(30, 50);
        this.setVelocity(speed, 0);
        this.size = fishSize.BIG;
        this.setCircle(30, 130, 40);
    }
}

class BiggestFish extends Fish {
    constructor(scene) {
        var x = -150;
        var y = 300;
        super(scene, x, y, 'biggest');
        var speed = 10;
        this.setVelocity(speed, 0);
        this.size = fishSize.BIGGEST;
        this.setCircle(100, 300, 50);
    }
}
