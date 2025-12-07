class Room {
    constructor(name, description, items = [], exits = {}) {
        this.name = name;
        this.description = description;
        this.items = items;  
        this.exits = exits;   
        this.isLit = false;   
    }

    showDetails() {
        console.log(`\n=== ${this.name} ===`);
        console.log(this.description);

        if (this.items.length > 0) {
            console.log("You notice:", this.items.join(", "));
        } else {
            console.log("Nothing useful here. Looks like Monday.");
        }

        const dirs = Object.keys(this.exits);
        console.log("Exits:", dirs.join(", "));
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.inventory = [];
        this.currentRoom = null;
    }

    pickItem(item) {
        this.inventory.push(item);
        console.log(`You pick up "${item}". Guard it with your life.`);
    }

    showInventory() {
        if (this.inventory.length === 0) {
            console.log("You're carrying absolutely nothing. Minimalist vibes.");
        } else {
            console.log("You're carrying:", this.inventory.join(", "));
        }
    }
}


const readline = require("readline");

class GameManager {
    constructor(player, rooms) {
        this.player = player;
        this.rooms = rooms;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        console.log("\nWelcome to the KNNX Adventure!");
        console.log("A small world filled with questionable design choices.\n");
        console.log("Type 'help' if you forget what to do.\n");

        this.player.currentRoom.showDetails();
        this.prompt();
    }

    prompt() {
        this.rl.question(">> ", (input) => {
            this.handleCommand(input.trim().toLowerCase());
            this.prompt();
        });
    }

    handleCommand(cmd) {
        if (cmd.startsWith("go ")) {
            this.move(cmd.slice(3));

        } else if (cmd.startsWith("pick ")) {
            this.pickItem(cmd.slice(5));

        } else if (cmd.startsWith("use ")) {
            this.useItem(cmd.slice(4));

        } else if (cmd === "look") {
            this.player.currentRoom.showDetails();

        } else if (cmd === "inventory") {
            this.player.showInventory();

        } else if (cmd === "help") {
            this.showHelp();

        } else if (cmd === "quit") {
            console.log("Exiting game. Hope reality is nicer.");
            process.exit(0);

        } else {
            console.log("Not sure what that means. Even the walls look confused.");
        }
    }

    move(direction) {
        const room = this.player.currentRoom;

        if (!room.exits[direction]) {
            console.log("You walk confidently… straight into a wall. Try again.");
            return;
        }

        const nextRoomName = room.exits[direction];
        const nextRoom = this.rooms[nextRoomName];

        if (nextRoomName === "Locked Door Room" && !this.player.inventory.includes("rusty key")) {
            console.log("\nThe door refuses to budge. It stares back at you like it's waiting for something… maybe a key?");
            return;
        }

        if (nextRoomName === "Dark Chamber" && !room.isLit && !this.player.inventory.includes("torch")) {
            console.log("\nYou blindly step inside… and immediately reconsider your life decisions.");
            console.log("It's too dark. Maybe lighting something would help.");
        }

        this.player.currentRoom = nextRoom;
        nextRoom.showDetails();
    }

    pickItem(item) {
        const room = this.player.currentRoom;
        const index = room.items.indexOf(item);

        if (index === -1) {
            console.log(`Can't find "${item}". Maybe check your eyesight?`);
            return;
        }

        room.items.splice(index, 1);
        this.player.pickItem(item);
    }

    useItem(item) {
        if (!this.player.inventory.includes(item)) {
            console.log(`You attempt to use "${item}", which is impressive since you don't have it.`);
            return;
        }

        // TORCH LOGIC
        if (item === "torch") {
            const room = this.player.currentRoom;

            if (room.name !== "Dark Chamber") {
                console.log("You wave the torch around like a budget wizard. Nothing changes.");
                return;
            }

            if (room.isLit) {
                console.log("The torch is already lit. Flexing won't help.");
                return;
            }

            room.isLit = true;
            room.description = "The chamber glows warmly as the torch lights up the stone walls. Looks less like a horror movie now.";
            console.log("\nYou light the torch. The room brightens up, revealing more detail.");
            return;
        }

        console.log(`You try using "${item}", but it doesn't seem to do anything interesting.`);
    }

    showHelp() {
        console.log("\nAvailable commands:");
        console.log("  go <direction>   - move to another room");
        console.log("  pick <item>      - pick an item from the room");
        console.log("  use <item>       - use an item from your inventory");
        console.log("  look             - inspect the current room");
        console.log("  inventory        - check items you’re carrying");
        console.log("  quit             - exit the game");
        console.log("");
    }
}


const entrance = new Room(
    "Entrance",
    "You stand at the old stone entrance. A lone torch lies on the floor, clearly abandoned by someone who gave up early.",
    ["torch"],
    { north: "Dark Chamber" }
);

const darkChamber = new Room(
    "Dark Chamber",
    "You step into complete darkness. Without a light source, you're basically guessing.",
    ["rusty key"],
    { south: "Entrance", east: "Locked Door Room" }
);

const lockedDoorRoom = new Room(
    "Locked Door Room",
    "A tall wooden door blocks your path. The keyhole looks like it hasn’t been used since the 90s.",
    [],
    { west: "Dark Chamber", north: "Treasure Room" }
);

const treasureRoom = new Room(
    "Treasure Room",
    "You've made it! Gold, jewels… all glued to the floor. Of course.",
    [],
    { south: "Locked Door Room" }
);

const rooms = {
    "Entrance": entrance,
    "Dark Chamber": darkChamber,
    "Locked Door Room": lockedDoorRoom,
    "Treasure Room": treasureRoom
};


const player = new Player("Explorer");
player.currentRoom = entrance;

const game = new GameManager(player, rooms);
game.start();
