<template>
    <div class="GraphDemo">
        <div id="container"></div>
    </div>
</template>

<script setup lang="ts">
import { Circle, ExtensionCategory, Graph, Line, register } from '@antv/g6';

class BreathingCircle extends Circle {
    onCreate() {
        const halo = this.shapeMap.halo;
        halo.animate([{ lineWidth: 0 }, { lineWidth: 20 }], {
            duration: 1000,
            iterations: Infinity,
            direction: 'alternate',
        });
    }
}

register(ExtensionCategory.NODE, 'breathing-circle', BreathingCircle);

class AntLine extends Line {
    onCreate() {
        const shape = this.shapeMap.key;
        shape.animate([{ lineDashOffset: -20 }, { lineDashOffset: 0 }], {
            duration: 500,
            iterations: Infinity,
        });
    }
}

register(ExtensionCategory.EDGE, 'ant-line', AntLine);


fetch('https://assets.antv.antgroup.com/g6/cluster.json')
    .then((res) => res.json())
    .then((data) => {
        const graph = new Graph({
            container: 'container',
            data,
            node: {
                type: 'breathing-circle',
                style: {
                    size: 50,
                    halo: true,
                    labelText: (d) => d.id,
                    ports: [],
                },
                palette: {
                    type: 'group',
                    field: 'cluster',
                },
            },
            edge: {
                type: 'ant-line',
                style: {
                    lineDash: [10, 10],
                },
            },
            layout: {
                type: 'force',
                linkDistance: 50,
                clustering: true,
                nodeClusterBy: 'cluster',
                clusterNodeStrength: 70,
            },
            behaviors: ['zoom-canvas', 'drag-canvas'],
        });

        graph.render();
    });
</script>

<style scoped>
.GraphDemo{
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    padding: 30px;
    #container{
        width: 100%;
        height: 100%;
    }
}
</style>
