import { ROLES } from "../data/characters.js";

// Evaluate the best role for a bot to pick
export function getBotMove(drawnChar, botSlots, difficulty) {
  const emptyRoles = ROLES.filter(r => !botSlots[r.key]);
  if (emptyRoles.length === 0) return null;

  // Easy mode: Completely random
  if (difficulty === "easy") {
    return emptyRoles[Math.floor(Math.random() * emptyRoles.length)].key;
  }

  // Score each choice based on character stats and our new Base Power System
  const scoredChoices = emptyRoles.map(role => {
    // A smart player compares a role strictly against the "Average" pull.
    // Average Base PWR = ~4. Average Role Stat = ~5.
    // Average points for positive role = 9. Average points for traitor = -9.
    
    if (role.key === "tra") {
      // Putting them in traitor gives: -(basePwr + traStat)
      // Good traitor is small penalty. If penalty is -3, we save 6 points compared to average (-9). Value = +6.
      const penalty = drawnChar.basePwr + drawnChar.s.tra;
      const value = 9 - penalty; // e.g. 9 - 13 = -4 (bad), 9 - 2 = +7 (good)
      return { key: "tra", value };
    } else {
      // Putting them in positive role gives: basePwr + posStat
      // Good positive is high points. If points is 15, we gain 6 against average (9). Value = +6.
      const reward = drawnChar.basePwr + drawnChar.s[role.key];
      const value = reward - 9; // e.g. 15 - 9 = +6 (good), 3 - 9 = -6 (bad)
      return { key: role.key, value };
    }
  });

  // Sort highest value first
  scoredChoices.sort((a, b) => b.value - a.value);

  // Hard mode: Always picks the theoretical best (highest value)
  if (difficulty === "hard") {
    return scoredChoices[0].key;
  }

  // Normal mode: 70% chance to pick best, 30% chance to pick random
  if (Math.random() < 0.7) {
    return scoredChoices[0].key;
  } else {
    return emptyRoles[Math.floor(Math.random() * emptyRoles.length)].key;
  }
}
