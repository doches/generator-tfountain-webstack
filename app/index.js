var Generator = require('yeoman-generator');

var chalk = require('chalk');
var yosay = require('yosay');

function decompose(name) {
    return name.replace(/[^a-zA-Z]/g, " ").replace(/\s+/g, " ").trim().split(" ");
}

function camelcase(name) {
    var words = decompose(name);
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length);
    }
    return words.join("");
}

function kebabcase(name) {
    var words = decompose(name);
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].toLowerCase();
    }
    return words.join("-");
}

var Generator = require('yeoman-generator');
module.exports = class extends Generator {
    async prompting() {
        this.log(yosay(
            'Welcome to ' + chalk.red('tfountain-webstack')
        ));

        var dir = this.destinationRoot()
        if (dir.split("/").length > 1) {
            dir = dir.split("/")
            dir = dir[dir.length-1]
        }

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Project name',
            default: dir
        }, {
            type: 'input',
            name: 'description',
            message: 'Project description',
            default: ""
        }];

        const answers = await this.prompt(prompts)
        this.props = {};
        this.props.className = camelcase(answers.name)
        this.props.slug = kebabcase(answers.name)
        this.props.name = answers.name
        this.props.description = answers.description
    }

    writing() {
        // Files to copy 
        var files = [
            "package.json",
            "tsconfig.json",
            "webpack.config.js",
            "src/app.tsx",
            "src/index.less",
            "src/index.tsx"
        ];
        for (var i = 0; i < files.length; i++) {
            this.fs.copyTpl(
                this.templatePath(files[i]),
                this.destinationPath(files[i]),
                this.props
            );
        }

        // Hidden files
        var hiddenFiles = [
            "gitignore",
            "babelrc",
            "eslintrc.js",
        ];
        for (var i = 0; i < hiddenFiles.length; i++) {
            this.fs.copy(
                this.templatePath(hiddenFiles[i]),
                this.destinationPath(`.${hiddenFiles[i]}`),
            );
        }
    }

    install () {
        var _this = this;
        this.spawnCommand('git', ['init']).on("close", function() {
            _this.spawnCommand('git', ['add', '*']).on("close", function() {
                _this.spawnCommand('git', ['commit', '-am', '\"Initial Commit\"']).on("close", function() {
                    _this.spawnCommand('git', ['tag', '0.0.0']).on("close", function() {
                        _this.spawnCommand('yarn', ['install']).on("close", function() {
                            _this.log(
                                `${chalk.cyan(_this.props.name)} is ready to 🤘. Run \`${chalk.yellow("yarn start")}\` to get started.`
                            );
                        });
                    });
                });
            });
        });
    }
};
