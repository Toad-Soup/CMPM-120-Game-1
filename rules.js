// Create flashlight and toolbox flags
let Flashlight = false;
let toolBox = false;

// Keep track of currently playing audio
let currentAudio = null;

class Start extends Scene {
    create() {
        // Stop any lingering audio from previous playthroughs
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }

        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData["Locations"][key];

        // Handle invalid location
        if (!locationData) {
            console.error("Invalid location key:", key);
            this.engine.show(`Error: Location "${key}" not found.`);
            this.engine.addChoice("Go back", this.engine.storyData.InitialLocation);
            return;
        }

        // Stop previous audio before potentially playing new one
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }

        // Play guitar audio in Reactor Hall
        if (key === "radio") {
            currentAudio = new Audio('assets/dawn.mp3');
            currentAudio.play().catch(e => console.warn("Couldn't play audio:", e));
        }

        this.engine.show(locationData.Body); 
        
        // Set toolbox flag if entering Maintenance hall
        if (key === "pick up") {
            toolBox = true;
        }

        // Add "Use toolbox" option if conditions are met
        if (key === "Reactor Hall" && toolBox === true) {
            console.log("Toolbox option triggered");
            this.engine.addChoice("Use toolbox", { Text: "Use toolbox", Target: "tools" });
        }

        // Add scene choices
        if (locationData.Choices !== undefined) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        // Stop audio when transitioning away
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }

        if (choice && typeof choice === "object") {
            this.engine.show("&gt; " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        // Stop any lingering audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }

        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
