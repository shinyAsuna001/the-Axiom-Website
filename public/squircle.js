class SquirclePainter {
  static get inputProperties() {
    return ['--squircle-radius'];
  }

  paint(ctx, geom, props) {
    const w = geom.width;
    const h = geom.height;
    const r = Math.min(
      parseFloat(props.get('--squircle-radius')) || 0,
      w / 2,
      h / 2
    );

    ctx.fillStyle = '#fff';
    if (r <= 0) {
      ctx.fillRect(0, 0, w, h);
      return;
    }

    const EXP = 0.4; // 2/n where n=5, produces iOS-like superellipse
    const STEPS = 32;

    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);

    for (let i = 1; i <= STEPS; i++) {
      const t = (Math.PI / 2) * (i / STEPS);
      ctx.lineTo(
        (w - r) + r * Math.pow(Math.sin(t), EXP),
        r - r * Math.pow(Math.cos(t), EXP)
      );
    }

    ctx.lineTo(w, h - r);

    for (let i = 1; i <= STEPS; i++) {
      const t = (Math.PI / 2) * (i / STEPS);
      ctx.lineTo(
        (w - r) + r * Math.pow(Math.cos(t), EXP),
        (h - r) + r * Math.pow(Math.sin(t), EXP)
      );
    }

    ctx.lineTo(r, h);

    for (let i = 1; i <= STEPS; i++) {
      const t = (Math.PI / 2) * (i / STEPS);
      ctx.lineTo(
        r - r * Math.pow(Math.sin(t), EXP),
        (h - r) + r * Math.pow(Math.cos(t), EXP)
      );
    }

    ctx.lineTo(0, r);

    for (let i = 1; i <= STEPS; i++) {
      const t = (Math.PI / 2) * (i / STEPS);
      ctx.lineTo(
        r - r * Math.pow(Math.cos(t), EXP),
        r - r * Math.pow(Math.sin(t), EXP)
      );
    }

    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
  }
}

registerPaint('squircle', SquirclePainter);
