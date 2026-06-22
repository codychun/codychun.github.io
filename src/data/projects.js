export const projects = [
  {
    id: 1,
    title: '32-bit Hashing ASIC',
    description: 'Secure hardware accelerator for custom Add-Rotate-XOR (ARX) cryptographic hashing processor. Designed hardware in SystemVerilog and developed test bench with 99% FSM code coverage and 99.47% block coverage. Performed full RTL-GDSII flow, resulting in a successful tapeout under the MUSE Semiconductor Multi-Project Wafer program. Met timing constraints with a positive slack of 0.805ns and total power consumption of 21.21mW.',
    tech: ['SystemVerilog', 'Cadence Innovus', 'Xcelium', 'SimVision', 'Virtuoso', 'Virtuoso PVS', 'Genus', 'Modus', 'Voltus'],
    link: null,
    github: 'https://github.com/codychun/hash_asic'
  },
  {
    id: 2,
    title: 'Raspberry Pi Alarm Clock',
    description: 'Web-connected haptic alarm clock with physical hardware integration. Built with Python backend and React frontend, featuring real-time Bluetooth Low Energy communication. Wake up silently.',
    tech: ['React', 'Python', 'Raspberry Pi', 'BLE', 'Soldering', 'Schematic Design'],
    link: '/alarm-clock',
    github: 'https://github.com/codychun/codychun.github.io/tree/main/src/pages/AlarmPage'
  },
  {
    id: 3,
    title: 'Torchlight Retro Arcade Game',
    description: 'Low visibility dungeon crawler arcade game built in C on the Neo6502 platform. Wrote game engine, designed sprites and tileset, and implemented sound effects from the ground up using C libraries on bare silicon.',
    tech: ['C', 'Neo6502'],
    link: null,
    github: 'https://github.com/codychun/torchlight'
  }
  // Add more projects as you build them!
]