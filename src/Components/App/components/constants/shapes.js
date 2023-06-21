import triangles from './images/shapes/triangles.png';
import verticalLines from './images/shapes/vertical lines.png';
import diagonalLines from './images/shapes/diagonal lines.png';
import squares from './images/shapes/squares.png';
import circles from './images/shapes/circles.png';
import upsideDownTriangles from './images/shapes/upside-down triangles.png';
import oppositeDiagonalLines from './images/shapes/opposite diagonal lines.png';
import horizontalLines from './images/shapes/horizontal lines.png';


const shapes = {
    EMPTY: {
        name: "empty",
        description: "Empty",
    },
    TRIANGLES: {
        name: "triangles",
        description: "Triangles",
        image: triangles
    },
    VERTICAL_LINES: {
        name: "vertical lines",
        description: "Vertical Lines",
        image: verticalLines
    },
    DIAGONAL_LINES: {
        name: "diagonal lines",
        description: "Diagonal Lines",
        image: diagonalLines
    },
    SQUARES: {
        name: "squares",
        description: "Squares",
        image: squares
    },
    CIRCLES: {
        name: "circles",
        description: "Circles",
        image: circles
    },
    UPSIDE_DOWN_TRIANGLES: {
        name: "upside-down triangles",
        description: "Upside-down Triangles",
        image: upsideDownTriangles
    },
    OPPOSITE_DIAGONAL_LINES: {
        name: "opposite diagonal lines",
        description: "Opposite Diagonal Lines",
        image: oppositeDiagonalLines
    },
    HORIZONTAL_LINES: {
        name: "horizontal lines",
        description: "Horizontal Lines",
        image: horizontalLines
    },
};

export default shapes;