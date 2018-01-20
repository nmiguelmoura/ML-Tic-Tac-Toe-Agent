/**
 * Created by Nuno on 14/09/17.
 */
nmm.dom.Div = class {
    constructor(options) {
        options = options || {};

        return this._build(options);
    }

    _build(options) {
        this.div = document.createElement('div');
        this.div.options = {
            parentDiv: options.parentDiv || document.body,
            top: options.top || 0,
            left: options.left || 0,
            width: options.width || 0,
            height: options.height || 0,
            display: options.display || 'block',
            addedToParent: false
        };

        this.div.show = function () {
            this.options.display = 'block';
            this.style.display = 'block';
        };

        this.div.hide = function () {
            this.options.display = 'none';
            this.style.display = 'none';
        };

        this.div.setClassName = function (className) {
            this.className = "app-div";
            if (className) {
                this.className += " " + className;
            }
        };

        this.div.addToParent = function () {
            if (!this.options.addedToParent) {
                this.options.addedToParent = true;
                this.options.parentDiv.appendChild(this);

                nmm.observer.subscribe('resize', this.resize, this);
            }
        };

        this.div.removeFromParent = function () {
            if (this.options.addedToParent) {
                this.options.addedToParent = false;
                this.options.parentDiv.removeChild(this);

                nmm.observer.unsubscribe('resize', this.resize, this);
            }
        };

        this.div.resize = function () {
            let scale = nmm.runtime.app.scale,
                margins = nmm.runtime.app.margins;

            this.style.left = margins.x + this.options.left * scale + 'px';
            this.style.top = margins.y + this.options.top * scale + 'px';
            this.style.width = this.options.width * scale + 'px';
            this.style.height = this.options.height * scale + 'px';
        };

        this.div.setClassName(options.className);

        this.div.options.display === 'block' ? this.div.show() : this.div.hide();

        this.div.addToParent();

        this.div.resize();

        return this.div;
    };
};