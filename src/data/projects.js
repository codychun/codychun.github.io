export const projects = [
  {
    id: 1,
    title: 'CRISPy Chip',
    description: 'Cody\'s (really) Reduced Istruction Set Processor...yay! Single-cycle RV32I CPU core with 11 instruction ISA for running insertion sort, with support for future expansion.',
    image: '/projects/crispy.png',
    tech: ['SystemVerilog', 'RISC-V', 'Icarus Verilog', 'GTKWave', 'Computer Architecture'],
    link: null,
    github: 'https://github.com/codychun/crispy-chip'
  },
  {
    id: 2,
    title: '32-bit Hashing ASIC',
    description: 'Hardware accelerator for custom Add-Rotate-XOR (ARX) hash processor. Full RTL-GDSII flow in Cadence EDA Suite on TSMC 180nm, resulting in a successful tapeout under the MUSE Semiconductor Multi-Project Wafer program.',
    image: '/projects/hash_asic.png',
    tech: ['SystemVerilog', 'Cadence EDA Suite', 'Verification', 'Tapeout', 'Finite State Machine (FSM)'],
    link: null,
    github: 'https://github.com/codychun/hash-asic'
  },
  {
    id: 3,
    title: 'LoRa GPS Tracker PCB',
    description: 'Location tracking system to send/receive local GPS coordinates to network via LoRa. 4-Layer PCB designed in KiCad to regulate battery and USB power via 3.3 LDO, and inter-chip communication via UART & SPI. FreeRTOS embedded software built in C running on Raspberry Pi.',
    image: '/projects/gps_tracker.png',
    tech: ['Embedded C', 'KiCad', 'FreeRTOS', 'UART', 'SPI', 'Raspberry Pi'],
    link: '/alarm-clock',
    github: 'https://github.com/codychun/codychun.github.io/tree/main/src/pages/AlarmPage'
  },
  {
    id: 4,
    title: 'Torchlight',
    description: 'Retro arcade game built on Neo6502 (MOS 6502/RP2040 co-processor). Low visibility dungeon crawler arcade game built in bare-metal C, compiled with LLVM-MOS with support for hardware and emulation.',
    image: '/projects/torchlight.png',
    tech: ['C', 'Neo6502', 'LLVM-MOS'],
    link: null,
    github: 'https://github.com/codychun/torchlight'
  },
  {
    id: 5,
    title: 'Haptic Alarm Clock',
    description: 'Web-connected haptic alarm clock with Raspberry Pi Pico 2W integration. Built with Python backend and React frontend, featuring real-time Bluetooth Low Energy communication. Wake up silently.',
    image: '/projects/alarm.png',
    tech: ['Python', 'Raspberry Pi', 'BLE', 'React', 'Node.js'],
    link: '/alarm-clock',
    github: 'https://github.com/codychun/codychun.github.io/tree/main/src/pages/AlarmPage'
  }
  // Add more projects as you build them!
]