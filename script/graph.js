var graph = function(verts, matrix) {
    this.verts = verts
    this.matrix = matrix
}

graph.prototype.getMin = function(verts, distanceTable) {
    var min = _
    var res
    for (var k in verts) {
        var index = verts[k]

        if (distanceTable[index] <= min) {
            min = distanceTable[index]
            res = k
        }
    }

    return res
}

graph.prototype.findPath = function(v1, v2) {
    var matrix = this.matrix
    var distanceTable = {}
    var verts = {}
    var prev = {}
 
    prev[v1] = undefined
    this.verts.forEach(function(v, index) {
        distanceTable[v] = _
        verts[v] = index
    })

    distanceTable[v1] = 0 
    delete verts[this.verts[v1]]

    var currentVertex = v1

    outer:while (!isEmpty(verts)) {
        inner:for (var k in verts) {
            var index = verts[k]
            if (distanceTable[index] > matrix[currentVertex][index] + distanceTable[currentVertex]) {
                distanceTable[index] = matrix[currentVertex][index] + distanceTable[currentVertex]

                prev[index] = currentVertex
            }
        }

        var vertex = this.getMin(verts, distanceTable)
        currentVertex = verts[vertex]
        delete verts[vertex]

        if (currentVertex == v2) {
            break outer
        }
    }
    
    var path = []
    var o = v2

    while (prev[o] != v1) {
        path.unshift(prev[o])
        o = prev[o]
    }
    
    return path
}