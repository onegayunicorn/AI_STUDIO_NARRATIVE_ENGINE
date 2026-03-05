import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const TripleHelix: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 600;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, 50)`);

    const numPoints = 20;
    const spacing = 25;
    const radius = 60;

    const drawStrand = (color: string, offset: number) => {
      const points = d3.range(numPoints).map(i => ({
        y: i * spacing,
        angle: (i * 0.5) + offset
      }));

      const line = d3.line<any>()
        .x(d => Math.sin(d.angle) * radius)
        .y(d => d.y)
        .curve(d3.curveBasis);

      const path = g.append('path')
        .datum(points)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 3)
        .attr('d', line);

      return { path, points };
    };

    const strand1 = drawStrand('#00ffff', 0);
    const strand2 = drawStrand('#ff00ff', Math.PI);

    // Draw base pairs
    const basePairs = g.selectAll('.base-pair')
      .data(d3.range(numPoints))
      .enter()
      .append('line')
      .attr('class', 'base-pair')
      .attr('stroke', 'rgba(255, 255, 255, 0.3)')
      .attr('stroke-width', 1);

    let t = 0;
    const animate = () => {
      t += 0.02;

      const updatePoints = (offset: number) => 
        d3.range(numPoints).map(i => ({
          y: i * spacing,
          angle: (i * 0.5) + offset + t
        }));

      const p1 = updatePoints(0);
      const p2 = updatePoints(Math.PI);

      const line = d3.line<any>()
        .x(d => Math.sin(d.angle) * radius)
        .y(d => d.y)
        .curve(d3.curveBasis);

      strand1.path.attr('d', line(p1));
      strand2.path.attr('d', line(p2));

      basePairs
        .attr('x1', (d, i) => Math.sin(p1[i].angle) * radius)
        .attr('y1', (d, i) => p1[i].y)
        .attr('x2', (d, i) => Math.sin(p2[i].angle) * radius)
        .attr('y2', (d, i) => p2[i].y);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 border-quantum rounded-lg bg-black/40">
      <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-cyan-400">Triple Helix DNA Coding</h3>
      <svg ref={svgRef} className="max-w-full h-auto" />
      <div className="mt-4 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-tighter opacity-70">
        <div className="flex flex-col items-center">
          <span className="text-cyan-400">Code</span>
          <span>Strand A</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-magenta-400">Consciousness</span>
          <span>Strand B</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-yellow-400">Reality</span>
          <span>Entangled</span>
        </div>
      </div>
    </div>
  );
};
