import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "./styles.css";
const backgrounds = {
  African: { skin: "#70452f", hair: "#17110e" },
  "East Asian": { skin: "#d5a47d", hair: "#17120f" },
  "South Asian": { skin: "#a96d4b", hair: "#15100d" },
  European: { skin: "#e6bea0", hair: "#5a3b27" },
  Latina: { skin: "#b97d59", hair: "#241611" },
  "Middle Eastern": { skin: "#b98260", hair: "#1b120f" },
  "Mixed / Multicultural": {
    skin: "#a97859",
    hair: "#211713"
  }
};
const bodyTypes = {
  Petite: { height: 1.62, width: 0.92 },
  Average: { height: 1.72, width: 1 },
  Athletic: { height: 1.78, width: 1.06 },
  Tall: { height: 1.88, width: 1.02 }
};
const defaultCharacter = {
  name: "Nova",
  nickname: "",
  age: 18,
  background: "Mixed / Multicultural",
  personality: "Calm, ambitious and creative",
  interests: "Music, learning and design",
  bio: "A new character beginning their story.",
  bodyType: "Average",
  hair: "Short",
  outfit: "Casual",
  pose: "Relaxed",
  expression: "Neutral",
  accessory: "None",
  outfitColor: "#30343d",
  height: 1.72,
  width: 1
};
function Character({ character }) {
  const background = backgrounds[character.background];
  const height =
    character.height / 1.72;
  return (
    <group
      position={[0, -1.4, 0]}
      scale={[height, height, height]}
    >
      {/* Head */}
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.42, 32, 24]} />
        <meshStandardMaterial color={background.skin} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 2.28, 0]}>
        <sphereGeometry args={[0.43, 32, 20]} />
        <meshStandardMaterial color={background.hair} />
      </mesh>
      {/* Body */}
      <mesh
        position={[0, 1.25, 0]}
        scale={[
          0.48 * character.width,
          0.7,
          0.28
        ]}
      >
        <capsuleGeometry args={[1, 1, 12, 24]} />
        <meshStandardMaterial
          color={character.outfitColor}
        />
      </mesh>
      {/* Left arm */}
      <mesh
        position={[-0.57 * character.width, 1.2, 0]}
        scale={[0.14, 0.65, 0.14]}
      >
        <capsuleGeometry args={[1, 1, 10, 16]} />
        <meshStandardMaterial
          color={character.outfitColor}
        />
      </mesh>
      {/* Right arm */}
      <mesh
        position={[0.57 * character.width, 1.2, 0]}
        scale={[0.14, 0.65, 0.14]}
      >
        <capsuleGeometry args={[1, 1, 10, 16]} />
        <meshStandardMaterial
          color={character.outfitColor}
        />
      </mesh>
      {/* Left leg */}
      <mesh
        position={[-0.2, 0.05, 0]}
        scale={[0.18, 0.9, 0.18]}
      >
        <capsuleGeometry args={[1, 1, 10, 16]} />
        <meshStandardMaterial
          color={character.outfitColor}
        />
      </mesh>
      {/* Right leg */}
      <mesh
        position={[0.2, 0.05, 0]}
        scale={[0.18, 0.9, 0.18]}
      >
        <capsuleGeometry args={[1, 1, 10, 16]} />
        <meshStandardMaterial
          color={character.outfitColor}
        />
      </mesh>
      {/* Shoes */}
      <mesh
        position={[-0.2, -0.92, 0.08]}
        scale={[0.25, 0.12, 0.4]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#101218" />
      </mesh>
      <mesh
        position={[0.2, -0.92, 0.08]}
        scale={[0.25, 0.12, 0.4]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#101218" />
      </mesh>
    </group>
  );
}
function CharacterScene({ character }) {
  return (
    <Canvas
      camera={{
        position: [0, 0.3, 5],
        fov: 35
      }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={2}
      />
      <Environment preset="studio" />
      <Character character={character} />
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={7}
      />
    </Canvas>
  );
}
function App() {
  const [character, setCharacter] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "character-universe"
        );
      return saved
        ? JSON.parse(saved)
        : defaultCharacter;
    });
  const [section, setSection] =
    useState("Create");
  const [tutorial, setTutorial] =
    useState(
      !localStorage.getItem(
        "character-universe-tutorial"
      )
    );
  const update = (key, value) => {
    setCharacter((old) => ({
      ...old,
      [key]: value
    }));
  };
  useEffect(() => {
    localStorage.setItem(
      "character-universe",
      JSON.stringify(character)
    );
  }, [character]);
  const chooseBackground = (name) => {
    update("background", name);
  };
  const chooseBody = (name) => {
    const body = bodyTypes[name];
    setCharacter((old) => ({
      ...old,
      bodyType: name,
      height: body.height,
      width: body.width
    }));
  };
  const finishTutorial = () => {
    localStorage.setItem(
      "character-universe-tutorial",
      "true"
    );
    setTutorial(false);
  };
  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="logo">
            CHARACTER
            <span> UNIVERSE</span>
          </div>
          <div className="tagline">
            Create • Style • Imagine • Live
          </div>
        </div>
        <button
          className="helpButton"
          onClick={() =>
            setTutorial(true)
          }
        >
          ?
        </button>
      </header>
      <main className="workspace">
        <section className="characterArea">
          <CharacterScene
            character={character}
          />
          <div className="characterLabel">
            <strong>
              {character.name}
            </strong>
            <span>
              {character.background}
            </span>
          </div>
        </section>
        <section className="controlPanel">
          <nav className="tabs">
            {[
              "Create",
              "Identity",
              "Style",
              "Pose",
              "Life"
            ].map((item) => (
              <button
                key={item}
                className={
                  section === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSection(item)
                }
              >
                {item}
              </button>
            ))}
          </nav>
          {section === "Create" && (
            <div className="content">
              <h1>
                Create Your Character
              </h1>
              <p>
                Start with a background and
                body type, then make them
                completely yours.
              </p>
              <label>
                Background
              </label>
              <div className="chips">
                {Object.keys(
                  backgrounds
                ).map((item) => (
                  <button
                    key={item}
                    className={
                      character.background ===
                      item
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      chooseBackground(item)
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label>
                Body type
              </label>
              <div className="chips">
                {Object.keys(
                  bodyTypes
                ).map((item) => (
                  <button
                    key={item}
                    className={
                      character.bodyType ===
                      item
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      chooseBody(item)
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          {section === "Identity" && (
            <div className="content">
              <h1>
                Character Profile
              </h1>
              <label>Name</label>
              <input
                value={character.name}
                onChange={(e) =>
                  update(
                    "name",
                    e.target.value
                  )
                }
              />
              <label>Nickname</label>
              <input
                value={character.nickname}
                onChange={(e) =>
                  update(
                    "nickname",
                    e.target.value
                  )
                }
              />
              <label>Age</label>
              <input
                type="number"
                value={character.age}
                onChange={(e) =>
                  update(
                    "age",
                    Number(e.target.value)
                  )
                }
              />
              <label>Personality</label>
              <textarea
                value={
                  character.personality
                }
                onChange={(e) =>
                  update(
                    "personality",
                    e.target.value
                  )
                }
              />
              <label>Interests</label>
              <textarea
                value={
                  character.interests
                }
                onChange={(e) =>
                  update(
                    "interests",
                    e.target.value
                  )
                }
              />
              <label>Bio</label>
              <textarea
                value={character.bio}
                onChange={(e) =>
                  update(
                    "bio",
                    e.target.value
                  )
                }
              />
            </div>
          )}
          {section === "Style" && (
            <div className="content">
              <h1>
                Style Studio
              </h1>
              <label>
                Hair
              </label>
              <div className="chips">
                {[
                  "Short",
                  "Curly",
                  "Wavy",
                  "Long",
                  "Braids",
                  "Bun"
                ].map((item) => (
                  <button
                    key={item}
                    className={
                      character.hair === item
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      update(
                        "hair",
                        item
                      )
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label>
                Outfit
              </label>
              <div className="chips">
                {[
                  "Casual",
                  "Streetwear",
                  "Formal",
                  "Sporty",
                  "Futuristic"
                ].map((item) => (
                  <button
                    key={item}
                    className={
                      character.outfit === item
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      update(
                        "outfit",
                        item
                      )
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label>
                Outfit color
              </label>
              <input
                type="color"
                value={
                  character.outfitColor
                }
                onChange={(e) =>
                  update(
                    "outfitColor",
                    e.target.value
                  )
                }
              />
            </div>
          )}
          {section === "Pose" && (
            <div className="content">
              <h1>
                Personality & Pose
              </h1>
              <label>
                Pose
              </label>
              <div className="chips">
                {[
                  "Relaxed",
                  "Confident",
                  "Hero",
                  "Wave",
                  "Hands on hips"
                ].map((item) => (
                  <button
                    key={item}
                    className={
                      character.pose === item
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      update(
                        "pose",
                        item
                      )
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label>
                Expression
              </label>
              <div className="chips">
                {[
                  "Neutral",
                  "Happy",
                  "Serious",
                  "Excited",
                  "Focused"
                ].map((item) => (
                  <button
                    key={item}
                    className={
                      character.expression ===
                      item
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      update(
                        "expression",
                        item
                      )
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          {section === "Life" && (
            <div className="content">
              <h1>
                Their Life
              </h1>
              <p>
                This is the beginning of
                the world simulation.
              </p>
              <div className="feature">
                🏠
                <strong>
                  Home
                </strong>
                <span>
                  Build a home and create
                  rooms.
                </span>
              </div>
              <div className="feature">
                ❤️
                <strong>
                  Needs
                </strong>
                <span>
                  Energy, hunger, fun,
                  hygiene and happiness.
                </span>
              </div>
              <div className="feature">
                👥
                <strong>
                  Relationships
                </strong>
                <span>
                  Meet characters, make
                  friends and build stories.
                </span>
              </div>
              <div className="feature">
                🌎
                <strong>
                  World
                </strong>
                <span>
                  Explore neighborhoods,
                  shops, parks and more.
                </span>
              </div>
            </div>
          )}
        </section>
      </main>
      {tutorial && (
        <div className="overlay">
          <div className="tutorial">
            <div className="tutorialEmoji">
              🌎
            </div>
            <h2>
              Welcome to Character
              Universe
            </h2>
            <p>
              Create characters, give
              them personalities and
              eventually build their
              entire lives.
            </p>
            <button
              className="startButton"
              onClick={
                finishTutorial
              }
            >
              Let's Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
createRoot(
  document.getElementById("root")
).render(
  <App />
);
