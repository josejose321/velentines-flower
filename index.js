function bouquet() {
  return {
    roses: [],
    stems: [],
    babysBreath: [],
    floatingHearts: [],
    sparkles: [],
    sparkleId: 0,
    name: new URLSearchParams(window.location.search).get('name') || '',
    // JOSEEEEE
    init() {
      this.createStemsAndRoses();
      this.createBabysBreath();
      this.createFloatingHearts();
    },

    createStemsAndRoses() {
      const roseColors = [
        { colorOuter: '#C41E3A', colorMid: '#D94255', colorInner: '#E8556D', colorCenter: '#8B0A1A', colorDeep: '#6B0515' },
        { colorOuter: '#E8556D', colorMid: '#F06E82', colorInner: '#F78DA7', colorCenter: '#C41E3A', colorDeep: '#9B1228' },
        { colorOuter: '#B8173A', colorMid: '#D43A55', colorInner: '#E8556D', colorCenter: '#7A0818', colorDeep: '#5A0410' },
        { colorOuter: '#D44060', colorMid: '#E86080', colorInner: '#F4A0B0', colorCenter: '#AA2040', colorDeep: '#881830' },
        { colorOuter: '#F4A0B0', colorMid: '#F7B8C4', colorInner: '#FDE2E8', colorCenter: '#E8556D', colorDeep: '#C44060' },
        { colorOuter: '#C82848', colorMid: '#DC4862', colorInner: '#EC6880', colorCenter: '#981830', colorDeep: '#781020' },
        { colorOuter: '#E06878', colorMid: '#EC8898', colorInner: '#F4A8B4', colorCenter: '#C44860', colorDeep: '#A03848' },
        { colorOuter: '#A01030', colorMid: '#C02848', colorInner: '#D84868', colorCenter: '#700820', colorDeep: '#500615' },
        { colorOuter: '#DC3050', colorMid: '#E85070', colorInner: '#F48098', colorCenter: '#B02040', colorDeep: '#901830' },
        { colorOuter: '#F08098', colorMid: '#F4A0B0', colorInner: '#F8C0CC', colorCenter: '#D06078', colorDeep: '#B04860' },
        { colorOuter: '#CC2040', colorMid: '#E04060', colorInner: '#F06080', colorCenter: '#A01830', colorDeep: '#801020' },
        { colorOuter: '#E86880', colorMid: '#F08898', colorInner: '#F4A8B8', colorCenter: '#CC4860', colorDeep: '#AA3850' },
      ];

      // All 12 stems fan out from the same center point (offsetX: 0)
      // Stems are positioned via CSS: bottom:120px, left: calc(50% + offsetX)
      // transform-origin: bottom center, rotated by angle
      const stemData = [
        // Center tall stems
        { height: 345, angle: -2,   offsetX: 0, leaf: true,  leafSide: 'right', leafPos: 50 },
        { height: 338, angle: 6,    offsetX: 0, leaf: true,  leafSide: 'left',  leafPos: 45 },
        // Second ring
        { height: 315, angle: -11,  offsetX: 0, leaf: true,  leafSide: 'left',  leafPos: 40 },
        { height: 320, angle: -6,   offsetX: 0, leaf: true,  leafSide: 'left',  leafPos: 55 },
        { height: 310, angle: 13,   offsetX: 0, leaf: true,  leafSide: 'right', leafPos: 48 },
        // Third ring
        { height: 285, angle: -20,  offsetX: 0, leaf: true,  leafSide: 'left',  leafPos: 42 },
        { height: 290, angle: -14,  offsetX: 0, leaf: false },
        { height: 280, angle: 18,   offsetX: 0, leaf: true,  leafSide: 'right', leafPos: 38 },
        { height: 275, angle: 24,   offsetX: 0, leaf: true,  leafSide: 'right', leafPos: 50 },
        // Outer ring
        { height: 260, angle: -28,  offsetX: 0, leaf: true,  leafSide: 'left',  leafPos: 48 },
        { height: 248, angle: 30,   offsetX: 0, leaf: false },
        { height: 255, angle: -34,  offsetX: 0, leaf: true,  leafSide: 'left',  leafPos: 45 },
      ];

      this.stems = stemData;

      // Calculate where each stem tip lands
      // Bouquet container: width=600, height=700
      // Stem base: bottom=120 → baseY = 700 - 120 = 580 (from top)
      // Stem baseX: 300 + offsetX (center of 600px bouquet)
      const baseY = 700 - 120;
      const centerX = 300;

      this.roses = stemData.map((stem, i) => {
        const rad = (stem.angle * Math.PI) / 180;
        const baseX = centerX + stem.offsetX;
        // Stem tip: grows upward from base, rotated by angle
        const tipX = baseX + Math.sin(rad) * stem.height;
        const tipY = baseY - Math.cos(rad) * stem.height;

        // Convert to the coordinate system used in the HTML template:
        //   left: calc(50% + ${rose.x}px - 35px)  → x is offset from center
        //   top: ${rose.y}px
        return {
          x: tipX - centerX,
          y: tipY - 35, // center the 70px rose on the tip
          ...roseColors[i % roseColors.length],
        };
      });
    },

    createBabysBreath() {
      this.babysBreath = [
        { x: -140, y: 110 }, { x: -110, y: 75 },  { x: 105, y: 80 },
        { x: 140, y: 115 },  { x: -65, y: 50 },   { x: 60, y: 45 },
        { x: -125, y: 165 }, { x: 130, y: 170 },   { x: 5, y: 38 },
        { x: -45, y: 95 },   { x: 50, y: 100 },    { x: -90, y: 150 },
        { x: 85, y: 155 },   { x: -20, y: 180 },   { x: 115, y: 145 },
      ];
    },

    createFloatingHearts() {
      this.floatingHearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 15,
        size: 0.6 + Math.random() * 1,
      }));
    },

    burstSparkles(rose, event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const parentRect = event.currentTarget.closest('.bouquet').getBoundingClientRect();
      const cx = rect.left - parentRect.left + rect.width / 2;
      const cy = rect.top - parentRect.top + rect.height / 2;

      const colors = ['#D4A843', '#E8C872', '#F4A0B0', '#fff', '#C41E3A'];

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const dist = 20 + Math.random() * 30;
        this.sparkles.push({
          id: this.sparkleId++,
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          delay: Math.random() * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setTimeout(() => {
        this.sparkles = this.sparkles.slice(-24);
      }, 2500);
    },
  };
}
