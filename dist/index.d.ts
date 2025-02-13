import * as PHYSICS from 'cannon-es';
import * as THREE from 'three';

export declare class About extends HTMLElement {
    private isVisible;
    constructor();
    connectedCallback(): void;
    render(): void;
    addEventListeners(): void;
    setDiceSets(diceSets: DiceSet[], onSelect: (set: DiceSet) => void): void;
    toggle(): void;
    setVisible(isVisible: boolean): void;
}

export declare class ClassicD6 extends Dice {
    static VALUE_NORMALS: {
        1: THREE.Vector3;
        2: THREE.Vector3;
        3: THREE.Vector3;
        4: THREE.Vector3;
        5: THREE.Vector3;
        6: THREE.Vector3;
    };
    constructor(environment: Environment, options?: Partial<ClassicDiceOptions>);
}

export declare interface ClassicDiceOptions {
    /**
     * Size of the dice, defaults to '1.3'.
     */
    size: number;
    /**
     * If the corners should be rounded, defaults to 'true'.
     */
    rounded: boolean;
    /**
     * The color of the dice, defaults to '#f9e199'.
     */
    diceColor: string;
    /**
     * The color of the numbers on the dice, defaults to '#000000'.
     */
    fontColor: string;
}

export declare class ClassicSet extends DiceSet {
    constructor(environment: Environment);
}

export declare class Controls extends HTMLElement {
    private diceSet;
    private loopID;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
    setDiceSet(set: DiceSet): void;
    private showResultsLoop;
}

export declare class Dice extends Object3D {
    #private;
    static PLASTIC: PHYSICS.Material;
    static MASS_PER_CUBIC: number;
    private valueVectors;
    private stableCounter;
    constructor(environment: Environment, valueVectors?: ValueNormals);
    roll(): void;
    getValue(): number | null;
    getFaceCount(): number;
    isStable(): boolean;
    isDice(): boolean;
    updateScene(): void;
    init(object: THREE.Object3D, body: PHYSICS.Body): void;
}

export declare class DiceD10 extends DiceObject {
    constructor(environment: Environment, options?: Partial<ClassicDiceOptions>);
    getValue(): number | null;
}

export declare class DiceD100_1 extends DiceObject {
    constructor(environment: Environment, options?: Partial<ClassicDiceOptions>);
    getValue(): number | null;
}

export declare class DiceD100_2 extends DiceObject {
    constructor(environment: Environment, options?: Partial<ClassicDiceOptions>);
}

export declare class DiceD12 extends DiceObject {
    constructor(environment: Environment, options?: Partial<ClassicDiceOptions>);
}

export declare class DiceD20 extends DiceObject {
    constructor(environment: Environment, options: Partial<ClassicDiceOptions>);
}

export declare class DiceD6 extends DiceObject {
    constructor(environment: Environment, options?: Partial<ClassicDiceOptions>);
}

export declare class DiceD8 extends DiceObject {
    constructor(environment: Environment, options?: Partial<ClassicDiceOptions>);
}

declare class DiceMesh extends Dice {
    constructor(environment: Environment, mesh: THREE.Object3D, shape: PHYSICS.Shape, values: ValueNormals);
    static createNormals(vertices: [number, number, number][], faces: number[][], negate?: boolean): ValueNormals;
    static createShape(vertices: [number, number, number][], faces: number[][], radius: number): PHYSICS.ConvexPolyhedron;
}

declare class DiceObject extends Dice {
    private size;
    private materialOptions;
    private fontColor;
    private diceColor;
    private geom;
    constructor(environment: Environment, geom: GeometryInfo, options?: Partial<ClassicDiceOptions>);
    getValue(): number | null;
    getFaceCount(): number;
    getChamferGeometry(vectors: Array<THREE.Vector3>, faces: number[][], chamfer: number): {
        vectors: THREE.Vector3[];
        faces: any[][];
    };
    makeGeometry(vertices: THREE.Vector3[], faces: number[][], radius: number, tab: number, af: number): THREE.BufferGeometry<THREE.NormalBufferAttributes>;
    createShape(vertices: Array<THREE.Vector3>, faces: number[][], radius: number): PHYSICS.ConvexPolyhedron;
    createGeometry(vertices: Array<THREE.Vector3>, radius: number): THREE.BufferGeometry<THREE.NormalBufferAttributes>;
    createTextTexture(text: string, color: string, backColor: string): THREE.Texture;
    getMaterials(): THREE.MeshPhongMaterial[];
    create(): void;
}

export declare class DiceSet {
    #private;
    environment: Environment;
    constructor(environment: Environment, id: string, name: string, image: string, description: string);
    addDice(faces: number, factory: () => void): void;
    getId(): string;
    getName(): string;
    getImage(): string;
    getDescription(): string;
    getFaces(): string[];
    getDiceName(faces: number): string;
    rollDice(faces: number | string): void;
    clearDices(): void;
    /**
     * returns the values of all currently rolled dices of the environment, that matches the specified faces
     * @param faces the number of faces of the dices to be considered
     */
    getDiceValues(faces: number): (number | null)[];
}

export declare class DragonD20 extends DiceMesh {
    static MESH: THREE.Object3D | null;
    constructor(environment: Environment);
}

export declare class DragonD4 extends DiceMesh {
    static MESH: THREE.Object3D | null;
    constructor(environment: Environment);
}

export declare class DragonD6 extends DiceMesh {
    static MESH: THREE.Object3D | null;
    static VALUE_NORMALS: {
        1: THREE.Vector3;
        2: THREE.Vector3;
        3: THREE.Vector3;
        4: THREE.Vector3;
        5: THREE.Vector3;
        6: THREE.Vector3;
    };
    constructor(environment: Environment);
}

export declare class DragonSet extends DiceSet {
    constructor(environment: Environment);
}

export declare class Environment {
    #private;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    world: PHYSICS.World;
    private controls;
    constructor();
    add(object3D: Object3D): void;
    remove(object3D: Object3D): void;
    /**
     * Installs this environment into a HTML element (or into the document body, if not specified.
     * @param parentElement the element to install the environment into
     */
    install(parentElement?: HTMLElement | undefined): void;
    adaptSize(): void;
    getDices(): Dice[];
}

declare interface GeometryInfo {
    tab: number;
    af: number;
    chamfer: number;
    vertices: [number, number, number][];
    faces: number[][];
    scaleFactor: number;
    values: number;
    faceTexts: string[];
    textMargin: number;
    textOffset: number;
    mass: number;
    inertia: number;
}

export declare class Object3D {
    environment: Environment;
    object: THREE.Object3D | undefined;
    body: PHYSICS.Body | undefined;
    constructor(environment: Environment);
    init(object: THREE.Object3D, body: PHYSICS.Body): void;
    destroy(): void;
    isDice(): boolean;
    updateScene(): void;
}

export declare class PlainSet extends DiceSet {
    #private;
    constructor(environment: Environment);
    getDiceValues(faces: number): (number | null)[];
}

export declare class RoundedBoxGeometry extends THREE.BufferGeometry {
    constructor(width: number, height: number, depth: number, radius: number, radiusSegments: number);
}

export declare class RoundTable extends Object3D {
    constructor(environment: Environment);
}

export declare class Table extends Object3D {
    constructor(environment: Environment);
}

export declare class Utils {
    static setShadows(object3D: THREE.Object3D): void;
    static random(limit: number, optOtherLimit?: number): number;
    static toggleVisible(object3D: THREE.Object3D): void;
}

/**
 * Defines the normal vectors for the faces of the dice,
 * as a record that associates the face value
 * with the normal the face points to.
 */
export declare type ValueNormals = Record<number, THREE.Vector3>;

export { }
