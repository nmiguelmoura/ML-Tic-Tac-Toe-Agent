/**
 * Created by Nuno on 22/09/17.
 */
nmm.dom.InputField = class {
    constructor(options) {
        options = options || {};

        return this._build(options);
    }

    _build(options) {
        this.input = document.createElement('input');
        this.input.options = {
            parentDiv: options.parentDiv || nmm.runtime.dom.mainDiv,
            type: options.type || 'text',
            maxLength: options.maxLength,
            top: options.top || 0,
            left: options.left || 0,
            width: options.width || 100,
            height: options.height || 36,
            display: options.display || 'block',
            trackChange: options.trackChange || false,
            callback: options.callback || function () {},
            addedToParent: false,
            enabled: false
        };

        this.input.setDimensions = function (dimensions) {
            this.options.width = dimensions.width || this.options.width;
            this.options.height = dimensions.height || this.options.height;
            this.resize();
        };

        this.input.setPosition = function (position) {
            this.options.top = position.top || this.options.top;
            this.options.left = position.left || this.options.left;
            this.resize();
        };

        this.input.setValue = function (value) {
            this.value = value;
        };

        this.input.getValue = function () {
            return this.value;
        };

        this.input.changeHandler = function () {
            this.options.callback(this.getValue());
        };

        this.input.enable = function () {
            if(!this.options.enabled) {
                this.options.enabled = true;
                this.disabled = false;
                if (this.options.trackChange) {
                    if (!this.changeBound) {
                        this.changeBound = this.changeHandler.bind(this);
                    }
                    this.addEventListener('input', this.changeBound);
                }
            }
        };

        this.input.disable = function () {
            if(this.options.enabled) {
                this.options.enabled = false;
                this.disabled = true;
                if (this.options.trackChange) {
                    this.removeEventListener('input', this.changeBound);
                }
            }
        };

        this.input.show = function () {
            this.options.display = 'block';
            this.style.display = 'block';
            this.enable();
        };

        this.input.hide = function () {
            this.options.display = 'none';
            this.style.display = 'none';
            this.disable();
        };

        this.input.setClassName = function (className) {
            this.className = "app-input-field";
            if (className) {
                this.className += " " + className;
            }
        };

        this.input.addToParent = function () {
            if (!this.options.addedToParent) {
                this.options.addedToParent = true;
                this.options.parentDiv.appendChild(this);

                nmm.observer.subscribe('resize', this.resize, this);
            }
        };

        this.input.removeFromParent = function () {
            if (this.options.addedToParent) {
                this.options.addedToParent = false;
                this.options.parentDiv.removeChild(this);

                nmm.observer.unsubscribe('resize', this.resize, this);
            }
        };

        this.input.resize = function () {
            let scale = nmm.runtime.app.scale;

            this.style.left = this.options.left * scale + 'px';
            this.style.top = this.options.top * scale + 'px';
            this.style.width = this.options.width * scale + 'px';
            this.style.height = this.options.height * scale + 'px';
        };

        this.input.setAttribute('type', this.input.options.type);

        if(this.input.options.maxLength) {
            this.input.setAttribute('maxlength', this.input.options.maxLength);
        }

        this.input.setClassName(options.className);

        this.input.options.display === 'block' ? this.input.show() : this.input.hide();

        this.input.addToParent();

        this.input.resize();

        return this.input;
    }
};