const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 4  
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 2.9 
const barFactor : number = 6.9 
const delay : number = 20 
const rot : number = Math.PI 
const colors : Array<string> = [
    "#f44336",
    "#3F51B5",
    "#0D47A1",
    "#DD2C00",
    "#004D40"
] 
const backColor : string = "#bdbdbd"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }
    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawVBar(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const size : number = Math.min(w, h) / sizeFactor 
        const hBar : number = Math.min(w, h) / barFactor 
        context.save()
        context.translate(w / 2, h / 2)
        context.rotate(rot * sf4)
        for (var j = 0; j < 2; j++) {
            DrawingUtil.drawLine(
                context,
                0,
                size / 2,
                size * (1 - 2 * j) * sf1,
                size / 2 - size * (sf1)
            )
        }
        DrawingUtil.drawLine(context, -size, -size / 2, -size + 2 * size * sf2, -size / 2)
        context.fillRect(-size, -size / 2 - hBar * sf3, 2 * size, hBar * sf3)
        context.restore()
    }

    static drawVBNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawVBar(context, scale)
    }
}