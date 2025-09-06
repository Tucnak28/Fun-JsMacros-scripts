# JsMacros Scripts

Collection of scripts for JsMacros mod. Organized by function.

## Directory Structure

### automation/
AFK prevention and automated tasks
- Anti-afk.ts - Prevents AFK kicks by sending "/bal" every 4 minutes
- afk_Kill.ts - AFK kill automation
- intervalKit.ts - Timer utilities
- loopSanity.ts - Parkour recording system with mocap integration

### combat/
TNT and explosive scripts
- Asteroid.ts - Spherical TNT explosions (1000 TNT, 40 block radius)
- ControlAsteroid.ts - Enhanced asteroid TNT system
- ControlTNT.ts - TNT placement and timing
- Fireball missile.ts - Fireball projectiles
- TntMania.ts - Mass TNT spawning
- TnTRaining.ts - TNT practice scenarios
- TnT Sphere.ts - Spherical TNT patterns

### movement/
Teleportation and navigation
- ClickTP.ts - Teleport to clicked block
- ElytraJump.ts - Enhanced elytra flight
- Home.ts - Simple "/home" command
- HomeKour.ts - Parkour home navigation
- sethome.ts - Home point utilities
- tpyesOnChat.ts - Auto-accept teleport requests

### world-edit/
Block placement and terrain modification
- blockStates.ts - Block state management
- Cursor-Destroy.ts - Destroy blocks at cursor
- Cursor-Destroy-V2.ts - Enhanced block destruction
- Cursor-Morph.ts - Transform blocks at cursor
- Cursor-Ray.ts - Ray-based terrain clearing (20 block radius, 600 length)
- Cursor-Ray V2.ts - Enhanced ray clearing
- Fire-Chaos.ts - Fire destruction
- Obliterator.ts - Mass destruction
- PlaceBlock.ts - Block placement utilities
- PlaceOnlyUp.ts - Upward-only placement
- Purifier.ts - Area cleaning
- rotated-Plane.ts - Rotated plane generation

### utilities/
General helper scripts
- clearGlobalVars.ts - Reset global variables
- guide_generator.ts - Generate documentation
- inventoryClose.ts - Inventory management
- KillAllProcesses.ts - Stop all running macros
- messageIgnore.ts - Chat filtering

### testing/
Debug and testing tools
- failed-test.ts - Failed test cases
- FPS-testing.ts - Frame rate testing
- ping.ts - Network latency testing
- test.ts - General testing
- Testing Pools.ts - Water testing scenarios
- Threading.ts - Multi-threading tests

### events/
Event-driven automation
- helloMyFriend.ts - Friend greeting automation

### archive/
Old/experimental scripts
- Various packet-level scripts, pixel art tools, and legacy code

## Usage

1. Place scripts in JsMacros scripts folder
2. Run through in-game JsMacros interface
3. Test destructive scripts in creative mode first
4. Check server permissions for command-based scripts

## Warnings

Scripts in combat/ and world-edit/ can cause major terrain changes. TNT scripts may cause lag. Always backup worlds before running destructive scripts.

## Configuration

Most scripts have configurable parameters at the top - TNT counts, timer intervals, block ranges, etc.

## Troubleshooting

- Script won't run: Check JsMacros version compatibility
- Commands fail: Verify server permissions
- Performance issues: Reduce TNT counts or add delays
- Kill all scripts: Use KillAllProcesses.ts