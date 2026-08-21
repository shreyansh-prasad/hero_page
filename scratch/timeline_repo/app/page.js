/**
 * Shunya — Event Timeline
 *
 * Root page. Renders the SceneController (2.5D conveyor belt engine).
 * This is the ONLY entry point. The page IS the experience.
 */

import SceneController from "@/components/SceneController";

export default function Home() {
  return <SceneController />;
}
