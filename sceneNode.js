/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /** 
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        // -----------

        var transform = this.trs.getTransformationMatrix();
        mvp = MatrixMult(mvp, transform);
        modelView = MatrixMult(modelView, transform);
        modelMatrix = MatrixMult(modelMatrix, transform);
        normalMatrix = getNormalMatrix(modelView);
       
        
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;
    
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    
        // Draw children
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
        

         // -----------
    }

    

}