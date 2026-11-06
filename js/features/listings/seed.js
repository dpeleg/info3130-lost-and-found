/** Sample listings used on first load. `mine: true` marks posts "owned" by the demo user. */
export const SEED = [
  { id: 's1', type: 'lost', title: 'Black backpack', category: 'Backpack', location: 'Library, 2nd floor', date: '2026-11-04', description: 'Black backpack with a red zipper pull. Has a laptop sleeve inside.', status: 'open', mine: true },
  { id: 's2', type: 'found', title: 'Car keys', category: 'Keys', location: 'Gym lobby', date: '2026-11-03', description: 'Toyota key with a red lanyard. Being held at the security desk.', status: 'open', mine: false },
  { id: 's3', type: 'lost', title: 'Blue water bottle', category: 'Water bottle', location: 'Cafeteria', date: '2026-11-02', description: 'Blue insulated bottle with a few stickers on the side.', status: 'open', mine: false },
  { id: 's4', type: 'found', title: 'Laptop charger', category: 'Charger', location: 'Room B204', date: '2026-11-01', description: 'USB-C charger left on a desk. Being held at the front office.', status: 'open', mine: false }
];
