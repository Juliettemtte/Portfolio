// Shared content objects
const sharedContent = {
  minishell: {
    title: "Build Your Own Shell (Minishell)",
    paragraphs: [
      "    As part of the 42 curriculum, I developed a custom Unix-like shell entirely in C, replicating core functionalities of Bash. This project involved implementing:",
      "    - Command parsing and execution",
      "    - Pipes and redirections (|, <, >, >>, <<)",
      "    - Built-in commands (cd, echo, pwd, export, unset, exit)",
      "    - Environment variable management",
      "    - Signal handling (Ctrl+C, Ctrl+\\)",
      "    - Manual memory and process management without relying on high-level libraries",
      "    The project strictly limited allowed C functions to low-level system calls (e.g. fork, execve, pipe, dup2, wait, etc.), encouraging a deep understanding of how command-line interpreters work at the system level.",
      "    Skills gained: process control, I/O redirection, shell parsing, signal handling, and low-level debugging in Unix environments."
    ]
  },
  cub3d: {
    title: "Build a Raycasting Engine (Cub3D)",
    paragraphs: [
      "    In this project from the 42 curriculum, I developed a basic 3D game engine using the raycasting technique, inspired by classic first-person shooters like Wolfenstein 3D. Implemented entirely in C, the engine features:",
      "    - Real-time rendering of a 3D environment from a 2D map",
      "    - Player movement, rotation and collision detection",
      "    - Texture mapping for walls to enhance visual realism",
      "    - Floor and ceiling rendering",
      "    - Use of a 42MLX, a lightweight graphics library for window management and drawing",
      "    The project required strict use of low-level system and graphics calls forbidding high-level graphics frameworks to deepen understanding of real-time rendering fundamentals.",
      "    Skills gained: 3D graphics fundamentals, raycasting, event-driven programming, texture mapping, and low-level graphics programming in Unix environments."
    ]
  },
  irc: {
    title: "Build a Real-Time Chat Server (ft_irc)",
    paragraphs: [
      "    As part of the 42 curriculum, I built a simplified IRC (Internet Relay Chat) server in C++, handling real-time communication between multiple clients. This project involved:",
      "    - Socket programming using low-level system calls (socket, bind, listen, accept, poll, ...)",
      "    - Parsing and responding to IRC protocol commands (NICK, USER, JOIN, PRIVMSG, KICK, ...)",
      "    - Managing multiple users and channels with modes, topics, and access control",
      "    - Implementing message broadcasting, private messaging, and server replies per RFC2812",
      "    - Handling user authentication and operator privileges",
      "    - Operating entirely without threads, using event-driven multiplexing with poll()",
      "    The project forbade use of high-level libraries and enforced strict system-level implementation to deepen understanding of network protocols and real-time server architecture.",
      "    Skills gained: socket programming, event-driven architecture, protocol parsing, client-server design, real-time communication, and robust C++ systems development."
    ]
  },
  pong: {
    title: "Real-Time Pong Platform (ft_transcendence)",
    paragraphs: [
      "    As a part of the 42 curriculum, I helped build a full-stack web application centered around a real-time multiplayer Pong game, integrating game logic, user interaction and social features. Key features included",
      "    - Real-time Pong matches via WebSockets",
      "    - Secure user authentication with 2FA and JWT",
      "    - Matchmaking system and match history tracking",
      "    - Friend system with add feature",
      "    - Responsive frontend using modern Typescript",
      "    - Dockerized multi-container deployment setup",
      "    Strict project constraints prohibited external game engines and high-level abstractions, requiring deep integration between frontend, backend and low-level real-time communication.",
      "    Skills gained: real-time app architecture, WebSocket communication, secure authentication, full-stack collaboration and scalable deployment with Docker."
    ]
  },
  contact: {
    title: "Get In Touch",
    paragraphs: [
      "    If you have any questions, feedback, or just want to connect, feel free to reach out!"
    ]
  }
};

// Main export with references to shared content
export const endingTexts = {
  video1: null,
  video2: null,
  video3: sharedContent.minishell,
  video4: sharedContent.cub3d,
  video5: sharedContent.irc,
  video6: sharedContent.pong,
  video7: sharedContent.contact,
  video8: null,
  video9: null,
  video10: null,
  video11: null,
  video12: null,
  videoReversed2: null,
  videoReversed3: null,
  videoReversed4: sharedContent.minishell,
  videoReversed5: sharedContent.cub3d,
  videoReversed6: sharedContent.irc,
  videoReversed7: sharedContent.pong,
  videoReversed8: sharedContent.minishell,
  videoReversed9: sharedContent.cub3d,
  videoReversed10: sharedContent.irc,
  videoReversed11: sharedContent.pong,
  videoReversed12: sharedContent.contact
};