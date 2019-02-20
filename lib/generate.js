const path = require('path');
const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');

function generate(answers) {
    const source = path.resolve(__dirname, '../boilerplates');
    const destination = `./${answers.projectName}`;
    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .source(source)
            .destination(destination)
            .use((files, _, done) => {
                Object.keys(files).forEach(fileName => {

                    const templateContent = files[fileName].contents.toString()

                    const transform = Handlebars.compile(templateContent);
                    const resultContent = transform(answers);

                    files[fileName].contents = new Buffer(resultContent)
                })
                done()
            }).build(err => {
                err ? reject(false) : resolve(true)
            })
    }).catch((e) => {
        console.log(e)
    })
}

module.exports = generate
