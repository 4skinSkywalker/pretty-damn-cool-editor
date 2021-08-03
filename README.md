<!-- PROJECT HEADER -->
<br />
<p align="center">

  <h3 align="center">Pretty Damn Cool Editor</h3>

  <p align="center">
    A rich text online editor that preserves your privacy.
    <br />
    <a href="https://4skinskywalker.github.io/pretty-damn-cool-editor/">View Demo</a>
    ·
    <a href="https://github.com/4skinSkywalker/pretty-damn-cool-editor/issues">Report Bug</a>
    ·
    <a href="https://github.com/4skinSkywalker/pretty-damn-cool-editor/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screenshot][product-screenshot]](https://github.com/4skinSkywalker/pretty-damn-cool-editor/)

This rich text online editor is meant to protect your privacy, just encrypted contents get stored on the web, everything else never leaves the client (neither your password nor your clear text).
The idea is to integrate this editor with the IPFS (InterPlanetary File System) which is a protocol and peer-to-peer network for storing and sharing data in a distributed file system.
On the IPFS is possible to upload files but neither modify nor delete them, for this reason the editor keep tracks of changes by referencing IPFS IDs in a git-like fashion with branches and commits.

Key takeaways:
* Preserves your privacy;
* Use a distributed immutable file system (yet to be implemented);
* Versions your files.



### Built With

* [Quill](https://quilljs.com/)
* [Bootstrap](https://getbootstrap.com)
* [AES-JS](https://github.com/ricmoo/aes-js)
* [GitGraph](https://gitgraphjs.com/)



<!-- GETTING STARTED -->
## Getting Started

To run this project you simply download all the files and run them inside any web server.
Or you can just simply use Live Server which is a plugin for Visual Studio Code and run it straight from the code editor.



<!-- USAGE -->
## Usage

The way this tool is meant to work is pretty intuitive: like any other text editor. Following a gif that shows how it works:

[![Product Demo][product-demo]](https://4skinskywalker.github.io/pretty-damn-cool-editor/)



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/4skinSkywalker/pretty-damn-cool-editor/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/SomeFeature`)
3. Commit your Changes (`git commit -m 'Add some SomeFeature'`)
4. Push to the Branch (`git push origin feature/SomeFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

This software is not licensed, you are free to abuse it. Bureaucracy will kill us all!



<!-- CONTACT -->
## Contact

Fredo Corleone - [@LinkedIn](https://www.linkedin.com/in/f3d3r1c07r0774/) - stopchemtrailsfred@gmail.com



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: screenshot.png
[product-demo]: demo.gif
