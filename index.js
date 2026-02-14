function bouquet() {
  return {
    roses: [],
    stems: [],
    babysBreath: [],
    floatingHearts: [],
    sparkles: [],
    sparkleId: 0,
    name: new URLSearchParams(window.location.search).get('name') || 'Marie Del Torrente',

    init() {
      this.createRoses();
      this.createStems();
      this.createBabysBreath();
      this.createFloatingHearts();
    },

    createRoses() {
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

      // 12 roses arranged in 4 rows: 2 top, 3 upper-mid, 4 mid, 3 bottom
      const positions = [
        // Top row (2)
        { x: -25, y: 60 },  { x: 30, y: 55 },
        // Upper-mid row (3)
        { x: -70, y: 95 },  { x: 0, y: 85 },   { x: 65, y: 95 },
        // Mid row (4)
        { x: -105, y: 135 }, { x: -40, y: 125 }, { x: 35, y: 120 }, { x: 100, y: 138 },
        // Lower row (3)
        { x: -80, y: 168 }, { x: -10, y: 160 }, { x: 65, y: 170 },
      ];

      this.roses = positions.map((pos, i) => ({
        ...pos,
        ...roseColors[i % roseColors.length],
      }));
    },

    createStems() {
      const stemData = [
        // Top row stems
        { height: 310, angle: -6,  offsetX: -25, leaf: true,  leafSide: 'left',  leafPos: 45 },
        { height: 315, angle: 5,   offsetX: 30,  leaf: true,  leafSide: 'right', leafPos: 50 },
        // Upper-mid row stems
        { height: 280, angle: -18, offsetX: -70, leaf: true,  leafSide: 'left',  leafPos: 40 },
        { height: 290, angle: -2,  offsetX: 0,   leaf: true,  leafSide: 'right', leafPos: 55 },
        { height: 280, angle: 16,  offsetX: 65,  leaf: true,  leafSide: 'right', leafPos: 38 },
        // Mid row stems
        { height: 245, angle: -28, offsetX: -105, leaf: false },
        { height: 255, angle: -12, offsetX: -40,  leaf: true, leafSide: 'left',  leafPos: 50 },
        { height: 260, angle: 10,  offsetX: 35,   leaf: false },
        { height: 240, angle: 26,  offsetX: 100,  leaf: true, leafSide: 'right', leafPos: 42 },
        // Lower row stems
        { height: 215, angle: -22, offsetX: -80, leaf: true,  leafSide: 'left',  leafPos: 48 },
        { height: 220, angle: -4,  offsetX: -10, leaf: false },
        { height: 210, angle: 18,  offsetX: 65,  leaf: true,  leafSide: 'right', leafPos: 45 },
      ];
      this.stems = stemData;
    },

    createBabysBreath() {
      const positions = [
        { x: -130, y: 115 }, { x: -100, y: 80 }, { x: 95, y: 85 },
        { x: 130, y: 120 },  { x: -60, y: 55 },  { x: 55, y: 50 },
        { x: -120, y: 170 }, { x: 125, y: 175 },  { x: 0, y: 45 },
        { x: -40, y: 100 },  { x: 45, y: 105 },   { x: -85, y: 155 },
        { x: 80, y: 160 },   { x: -15, y: 185 },  { x: 110, y: 150 },
      ];
      this.babysBreath = positions;
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