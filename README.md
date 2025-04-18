# CMPM-120-Game-1
link based game for CMPM 120

# Music Disclaimer
There is music in this game, Dawn: Dawn is a feeling by the Moody Blues.
I do not technically have the rights to use this song but this is for a school assignment and not for profit and can be removed if necessary.
all this to say, please don't sue me I'm sorry 

# StoryGraphTool
A template by Adam Smith.
Adapted by yours truly for the purpose of creating a linked based game.

## Engine Documentation

Build your story by defining a few subclasses of `Scene` and adding your story data to a JSON file like `myStory.json`. To begin play, call `Engine.load(firstSceneClassName, pathToStoryJson)`.

### Engine:
#### Methods:
- `setTitle(title)`: Show a large header and change the title of the webpage.
- `show(text)`: Append some text to the web page.
- `addChoice(text, [data])`: Add a button which appears to the player as `text`, supplying an optional `data` argument to customize the effects of this choice. All choice buttons are removed as soon as the player selects one of them.
- `gotoScene(sceneClass, [data])`: Transition to a new scene by provided class name, supplying an optional `data` argument to customize the scene instance.

### Scene
#### Methods:
- `create([data])`: Called when a scene is first presented to the player. The `data` argument comes from the second parameter to `gotoScene`.
- `handleChoice([data])`: Called when the player as selected a choice button. The `data` argument comes from the second parameter to `addChoice`.

#### Fields:
- `engine`: An instance of `Engine`, as documented below:
- `storyData`: The result of parsing the JSON file at `pathToStoryJson`
