class Color {

    r = 0;
    g = 0;
    b = 0;
    a = 0;

    constructor(r=1, g=1, b=1, a=1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    get clear() { return new Color(0, 0, 0, 0); }
    get black() { return new Color(0, 0, 0, 1); }
    get white() { return new Color(1, 1 ,1, 1); }



    static HSV (h=360, s=1, v=1, a=1)  {
        h = h / 60;
        if (s == 0) return new Color(v, v, v, a);

        var i = parseInt(h);
        var f = h - i;
        var v1 = v * (1 - s);
        var v2 = v * (1 - s * f);
        var v3 = v * (1 - s * (1 - f));

        switch (i) {
            case 0:
            case 6:
                return new Color(v, v3, v1, a);
            case 1:
                return new Color(v2, v, v1, a);
            case 2:
                return new Color(v1, v, v3, a);
            case 3:
                return new Color(v1, v2, v, a);
            case 4:
                return new Color(v3, v1, v, a);
            case 5:
                return new Color(v, v1, v2, a);
        }
    }

    toHSV() {
        let max = Math.max(this.r, this.g, this.b);
        let min = Math.min(this.r, this.g, this.b);
        let diff = max - min;

        let h = 0;

        switch (min) {
            case max:
                h = 0;
                break;
            case this.r:
                h = (60 * ((this.b - this.g) / diff)) + 180;
                break;
            case this.g:
                h = (60 * ((this.r - this.b) / diff)) + 300;
                break;
            case this.b:
                h = (60 * ((this.g - this.r) / diff)) + 60;
                break;
        }

        let s = max == 0 ? 0 : diff / max;
        let v = max;

        return [h, s, v, this.a];
    }

    static lerp(a, b, t) {
        t = Math.min(1, Math.max(0, t));
        return new Color(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t, a.a + (b.a - a.a) * t );
    }

    static lerpHSV(a, b, t) {
        t = Math.min(1, Math.max(0, t));
        let hsva = a.toHSV();
        let hsvb = b.toHSV();
        return Color.HSV(hsva[0] + (hsvb[0] - hsva[0]) * t, hsva[1] + (hsvb[1] - hsva[1]) * t, hsva[2] + (hsvb[2] - hsva[2]) * t, a.a + (b.a - a.a) * t );
    }

    static HEX(hex) {
        if (hex.slice(0, 1) == "#") hex = hex.slice(1);
        if (hex.length == 3) hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3) + "FF";
        else if (hex.length == 4) hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3) + hex.slice(3, 4) + hex.slice(3, 4);
        else if (hex.length == 6) hex += "FF";
        return new Color(parseInt(hex.slice(0, 2), 16) / 255, parseInt(hex.slice(2, 4), 16) / 255, parseInt(hex.slice(4, 6), 16) / 255, parseInt(hex.slice(6, 8), 16) / 255);
    }

    toHEX() {
        return "#" + [this.r, this.g, this.b, this.a].map(function (value) {
            return ("0" + Math.round(value*255).toString(16)).slice(-2);
        }).join("");
    }



    toString() { return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')'; }
}