<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="extension\icon.png" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# LOCKEDOUT

<em></em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/davidshukhin/lockedout?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/davidshukhin/lockedout?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/davidshukhin/lockedout?style=default&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/davidshukhin/lockedout?style=default&color=0080ff" alt="repo-language-count">

<!-- default option, no dependency badges. -->


<!-- default option, no dependency badges. -->

</div>
<br>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
    - [Project Index](#project-index)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview



---

## Features

|      | Component       | Details                              |
| :--- | :-------------- | :----------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Monolithic architecture with multiple layers</li><li>Uses TypeScript for type safety and JavaScript for client-side logic</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>High code quality with a focus on maintainability and scalability</li><li>Utilizes ESLint and Prettier for code formatting and linting</li></ul> |
| 📄 | **Documentation** | <ul><li>Limited documentation, mostly in the form of comments and README files</li><li>No formal documentation framework or tooling</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integrated with various libraries and frameworks, including React, Next.js, Express, and Supabase</li><li>Uses Webpack for bundling and Babel for transpiling</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Monolithic architecture makes it difficult to separate concerns or reuse code</li><li>Lack of clear separation between presentation, business logic, and data access layers</li></ul> |
| 🧪 | **Testing**       | <ul><li>No unit testing framework or tooling detected</li><li>Some integration tests present in the codebase, but no clear testing strategy</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Uses caching and memoization to improve performance</li><li>Limited optimization for large-scale deployments or high-traffic scenarios</li></ul> |
| 🛡️ | **Security**      | <ul><li>Uses HTTPS and SSL/TLS encryption for secure data transmission</li><li>Limited security testing or auditing detected</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Depends on a wide range of libraries and frameworks, including React, Next.js, Express, and Supabase</li><li>No clear dependency management strategy or tooling</li></ul> |
| 🚀 | **Scalability**   | <ul><li>Limited scalability features or optimizations detected</li><li>No clear load balancing or distributed architecture in place</li></ul> |

---

## Project Structure

```sh
└── lockedout/
    ├── README.md
    ├── biome.jsonc
    ├── components.json
    ├── extension
    │   ├── _metadata
    │   ├── background.js
    │   ├── blocked.css
    │   ├── blocked.html
    │   ├── blocked.js
    │   ├── icon.png
    │   ├── lib
    │   ├── manifest.json
    │   ├── popup.html
    │   ├── popup.js
    │   ├── rules.json
    │   └── test-assignments.js
    ├── next.config.js
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── favicon.ico
    │   ├── icon.ico
    │   ├── icon.png
    │   └── images
    ├── src
    │   ├── app
    │   ├── components
    │   ├── env.js
    │   ├── lib
    │   ├── pages
    │   ├── server
    │   ├── styles
    │   └── trpc
    ├── stores
    │   └── assignmentStore.ts
    ├── supabase
    │   └── migrations
    ├── tsconfig.json
    ├── types
    │   └── assignments.ts
    └── yarn.lock
```

### Project Index

<details open>
	<summary><b><code>LOCKEDOUT/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/postcss.config.js'>postcss.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures PostCSS plugins for the project, enabling Tailwind CSS integration through the @tailwindcss/postcss plugin<br>- This setup allows for seamless styling and utility-first development across the codebase.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/next.config.js'>next.config.js</a></b></td>
					<td style='padding: 8px;'>- Configure Next.js settings for the project, allowing for flexible builds with Docker<br>- The file imports environment configuration and sets up page extensions and output directory<br>- This enables efficient development and deployment of web applications.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/components.json'>components.json</a></b></td>
					<td style='padding: 8px;'>- Configures the projects UI components, styles, and libraries, defining aliases for reusable code, icon library, and CSS variables<br>- This file sets the tone for the entire codebase architecture, establishing a consistent look and feel across the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Configures the TypeScript compiler settings for the project, enabling features such as ES2022 target, strict mode, and module resolution<br>- It also sets up path aliases, excludes unnecessary directories, and specifies include patterns for type checking<br>- This configuration enables efficient development and bundling of the projects codebase.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/biome.jsonc'>biome.jsonc</a></b></td>
					<td style='padding: 8px;'>- Configures the Biome JavaScript projects settings, enabling version control with Git, ignoring unknown files, and formatting code according to specified rules<br>- The linter is enabled, applying recommended and nursery-level rules to ensure consistent coding standards<br>- This configuration file defines the projects organization, import management, and linting preferences for effective development and maintenance.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/package-lock.json'>package-lock.json</a></b></td>
					<td style='padding: 8px;'>Manages the projects dependencies, including popular libraries such as Supabase, Radix UI, and Tanstack.<em> Provides a version-controlled record of the project's dependency tree, ensuring reproducibility and consistency.</em> Facilitates efficient installation and management of dependencies for developers working on the project.By understanding the contents of this file, developers can quickly grasp the projects technical landscape, identify potential issues, and make informed decisions about dependency updates or changes.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Configures the chicken_jockey project's build, development, and deployment processes through scripts, leveraging dependencies such as Next.js, Supabase, and Trpc<br>- The package.json file defines various commands to streamline tasks like building, checking, and starting the application<br>- It also specifies dependencies and devDependencies required for the project's execution.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- extension Submodule -->
	<details>
		<summary><b>extension</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ extension</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/popup.js'>popup.js</a></b></td>
					<td style='padding: 8px;'>- Authenticates User and Fetches Block List**This code initializes the popup by checking the users authentication status, fetching their block list, and updating the UI accordingly<br>- It also handles login and logout button clicks, refreshing the UI after successful sign-in or sign-out<br>- Additionally, it listens for tab updates to detect successful sign-ins and applies new configuration settings when saved.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/background.js'>background.js</a></b></td>
					<td style='padding: 8px;'>- This background script initializes a Supabase client and sets up an authentication state change listener to manage user sessions<br>- It also checks for active assignments, which determines whether to block certain domains or not<br>- The script periodically updates the blocked domains list from Supabase and applies immediate blocking rules when necessary.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/popup.html'>popup.html</a></b></td>
					<td style='padding: 8px;'>- Provides the user interface for the LockedOut Extension, displaying status updates and allowing users to sign in or out<br>- The HTML file defines a popup window with a title, styles for various elements, and placeholders for dynamic content<br>- It also includes JavaScript references and hidden buttons for signing in and out.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/blocked.css'>blocked.css</a></b></td>
					<td style='padding: 8px;'>- Establishes a visually appealing and responsive layout for the projects core components, including the block screen, icon, quote container, title, and subtitle<br>- This code defines a unique gradient background animation, font styles, and text shadow effects to create an immersive user experience.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/blocked.html'>blocked.html</a></b></td>
					<td style='padding: 8px;'>- Provides a visual representation of the site being blocked due to pending assignments, featuring a loading animation and a message prompting users to complete their assignments to regain access<br>- The file serves as a gateway, redirecting users to take necessary actions before accessing the site.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/test-assignments.js'>test-assignments.js</a></b></td>
					<td style='padding: 8px;'>- Enable, Disable, and Manage Test Assignments**This script provides functions to create, remove, and list test assignments for debugging blocking functionality in a Chrome extension<br>- The <code>createTestAssignment</code> function adds a test assignment to enable blocking, while <code>removeTestAssignment</code> removes it to disable blocking<br>- The <code>listAssignments</code> function displays the current assignments.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/blocked.js'>blocked.js</a></b></td>
					<td style='padding: 8px;'>- The <code>blocked.js</code> file is a key component of the project's architecture, responsible for managing and providing access to inspirational quotes<br>- This code achieves a simple yet powerful functionality by storing an array of quote objects, each containing a title, quote text, and icon<br>- The quotes are thoughtfully curated to promote mindfulness, self-reflection, and personal growth.<strong>Key Takeaways:</strong><em> The file provides a centralized repository for inspirational quotes.</em> Each quote is represented as an object with three properties: title, quote text, and icon.* This code serves as a foundation for integrating these quotes into the project's overall design.By understanding the purpose and functionality of this code file, developers can better appreciate how it contributes to the larger architecture of the project.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/rules.json'>rules.json</a></b></td>
					<td style='padding: 8px;'>- Configures rules for the projects extension processing pipeline.This file defines a set of rules that govern how files are processed and transformed within the projects extension framework<br>- By specifying these rules, developers can customize the behavior of their extensions to suit specific use cases or requirements.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/manifest.json'>manifest.json</a></b></td>
					<td style='padding: 8px;'>- Configures the Assignment Blocker extensions core settings, defining its name, version, permissions, and interactions with the browser<br>- It specifies the background service worker, popup, icon, and content security policy, as well as rules for declarative network requests and web accessible resources<br>- This file serves as a central hub for the extensions functionality and dependencies.</td>
				</tr>
			</table>
			<!-- lib Submodule -->
			<details>
				<summary><b>lib</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ extension.lib</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/lib/supabase.js'>supabase.js</a></b></td>
							<td style='padding: 8px;'>- README Summary**The <code>supabase.js</code> file is a core component of the Supabase project, providing a JavaScript client for interacting with the Supabase API<br>- This file enables developers to easily integrate Supabase into their applications, allowing them to perform various operations such as querying data, creating and updating records, and more.In summary, this code file provides a crucial piece of functionality that enables seamless communication between your application and the Supabase database, making it an essential part of the overall project architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/lib/supabase-client.js'>supabase-client.js</a></b></td>
							<td style='padding: 8px;'>- Establishes a connection to Supabase, enabling interaction with the projects data storage and management system<br>- The <code>initSupabaseClient</code> function initializes the client instance by loading the Supabase JavaScript library from a CDN, then creates a client instance using the provided URL and key<br>- This allows for subsequent API calls to manipulate data within the Supabase project.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- _metadata Submodule -->
			<details>
				<summary><b>_metadata</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ extension._metadata</b></code>
					<!-- generated_indexed_rulesets Submodule -->
					<details>
						<summary><b>generated_indexed_rulesets</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ extension._metadata.generated_indexed_rulesets</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/extension/_metadata/generated_indexed_rulesets/_ruleset1'>_ruleset1</a></b></td>
									<td style='padding: 8px;'>- Generates and stores metadata for ruleset1, a critical component of the projects decision-making framework<br>- This file contains essential information about the ruleset, including its version number, which enables efficient management and integration with other components<br>- Its presence ensures seamless data processing and analysis within the system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- stores Submodule -->
	<details>
		<summary><b>stores</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ stores</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/stores/assignmentStore.ts'>assignmentStore.ts</a></b></td>
					<td style='padding: 8px;'>- Manages assignment data storage and retrieval.This file provides a centralized store for assignments, allowing components to access and update the data seamlessly<br>- It utilizes Zustands create function to establish a global state management system, enabling efficient handling of loading states, errors, and assignment updates.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- types Submodule -->
	<details>
		<summary><b>types</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ types</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/types/assignments.ts'>assignments.ts</a></b></td>
					<td style='padding: 8px;'>- Defines the Assignment type, encapsulating essential properties such as name, due date, course, and IDs<br>- This type serves as a blueprint for representing assignments within the projects data model, facilitating structured storage and retrieval of assignment-related information.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/env.js'>env.js</a></b></td>
					<td style='padding: 8px;'>- Configures environment variables for the project, providing a centralized management of settings across different environments (development, test, production)<br>- It utilizes Zod schema validation to ensure correct data types and default values are set when necessary<br>- This file enables consistent configuration and reduces errors by validating environment variables at runtime.</td>
				</tr>
			</table>
			<!-- app Submodule -->
			<details>
				<summary><b>app</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.app</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/providers.tsx'>providers.tsx</a></b></td>
							<td style='padding: 8px;'>- Establishes the foundation for authentication management within the application by providing a centralized session provider<br>- This file enables the integration of NextAuths session management capabilities throughout the codebase, ensuring secure and controlled access to protected routes and features.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/page.tsx'>page.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides a personalized learning dashboard**This code defines the Home page of the Locked Out application, offering users a customized experience based on their session status<br>- If authenticated, it displays a users name and provides tools for managing blocked websites, linking classes, and tracking assignments<br>- For unauthenticated users, it presents a welcome message and invites them to sign in or get started with the application.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/layout.tsx'>layout.tsx</a></b></td>
							<td style='padding: 8px;'>- Establishes the foundation of the applications layout, providing a wrapper for child components to render within<br>- This file sets up essential metadata, font styles, and providers for the React application, enabling seamless integration with TRPC and other dependencies<br>- It serves as a central hub for rendering the applications UI, incorporating features like toast notifications and font customization.</td>
						</tr>
					</table>
					<!-- _components Submodule -->
					<details>
						<summary><b>_components</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app._components</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/_components/email-template.tsx'>email-template.tsx</a></b></td>
									<td style='padding: 8px;'>- Defines the EmailTemplate component, rendering a personalized welcome message based on the provided firstName<br>- This reusable component enables dynamic email templates, allowing for tailored communications with users.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/_components/post.tsx'>post.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides the latest post information and allows users to create new posts.This component fetches the most recent post using an API query and displays it if available<br>- It also enables users to submit a new post by providing a title, which triggers a mutation that updates the post list and clears the input field once successful.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- blocklist Submodule -->
					<details>
						<summary><b>blocklist</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.blocklist</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/blocklist/page.tsx'>page.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a user interface for managing a block list of websites<br>- The page displays a list of blocked sites and allows users to add new sites by entering their URLs and removing existing ones with the click of a button.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- extension-success Submodule -->
					<details>
						<summary><b>extension-success</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.extension-success</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/extension-success/page.tsx'>page.tsx</a></b></td>
									<td style='padding: 8px;'>- Signs users out of the application after a successful sign-in, prompting them to close the tab<br>- This functionality ensures a seamless user experience by automatically terminating the extensions presence once authentication is complete<br>- The code plays a crucial role in maintaining the integrity of the projects overall architecture and user flow.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- api Submodule -->
					<details>
						<summary><b>api</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.api</b></code>
							<!-- check-session Submodule -->
							<details>
								<summary><b>check-session</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.check-session</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/api/check-session/route.ts'>route.ts</a></b></td>
											<td style='padding: 8px;'>- Verifies user session status by checking if a valid authentication exists.This route checks the current users session and returns a JSON response indicating whether the user is signed in (true) or not (false)<br>- The response also includes the authenticated user's details<br>- This functionality is crucial for ensuring secure access to protected routes within the application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- blocklist Submodule -->
							<details>
								<summary><b>blocklist</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.blocklist</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/api/blocklist/route.ts'>route.ts</a></b></td>
											<td style='padding: 8px;'>- Handles API requests for managing blocklists, allowing users to retrieve their current blocklist, add or remove sites from the list, and authenticate with NextAuth<br>- The code provides a secure interface for updating user blocklists while ensuring proper authorization and error handling.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- check-assignments Submodule -->
							<details>
								<summary><b>check-assignments</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.check-assignments</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/api/check-assignments/route.ts'>route.ts</a></b></td>
											<td style='padding: 8px;'>- Authenticates users and checks if they have active, unsubmitted assignments<br>- If the user has pending assignments, it returns a JSON response indicating that they should be blocked<br>- Otherwise, it indicates that all assignments are submitted and no blocking is necessary<br>- This API endpoint ensures that users with outstanding tasks are prevented from performing certain actions.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- trpc Submodule -->
							<details>
								<summary><b>trpc</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.trpc</b></code>
									<!-- [trpc] Submodule -->
									<details>
										<summary><b>[trpc]</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.trpc.[trpc]</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/api/trpc/[trpc]/route.ts'>route.ts</a></b></td>
													<td style='padding: 8px;'>- Establishes the foundation for handling HTTP requests in a Next.js API by providing a context for tRPC API routes<br>- This file creates a wrapper around the <code>createTRPCContext</code> helper, injecting the required context for each request<br>- The resulting handler is used to fetch and process API requests from client components.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- auth Submodule -->
							<details>
								<summary><b>auth</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.api.auth</b></code>
									<!-- [...nextauth] Submodule -->
									<details>
										<summary><b>[...nextauth]</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.app.api.auth.[...nextauth]</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/api/auth/[...nextauth]/route.ts'>route.ts</a></b></td>
													<td style='padding: 8px;'>- Authenticates users through NextAuth, utilizing configuration settings from the servers auth module<br>- This route handler enables secure API endpoints for user authentication, facilitating seamless login and registration processes within the application.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/api/auth/[...nextauth]/options.ts'>options.ts</a></b></td>
													<td style='padding: 8px;'>- Configure authentication options for NextAuth using Google provider.This file sets up the authentication mechanism for the application, allowing users to sign in with their Google accounts<br>- It defines the client ID and secret, which are environment variables that need to be set<br>- This configuration enables seamless integration of Google authentication into the overall project architecture.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- auth Submodule -->
					<details>
						<summary><b>auth</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.app.auth</b></code>
							<!-- error Submodule -->
							<details>
								<summary><b>error</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.auth.error</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/auth/error/page.tsx'>page.tsx</a></b></td>
											<td style='padding: 8px;'>- Handles error pages in the application, providing a visually appealing and informative experience for users encountering errors<br>- This component renders an error message, if available, or a default message if not, within a stylized container that adapts to various screen sizes.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- verify Submodule -->
							<details>
								<summary><b>verify</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.auth.verify</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/auth/verify/page.tsx'>page.tsx</a></b></td>
											<td style='padding: 8px;'>- Authenticates user identity by verifying email address.This component serves as a crucial step in the authentication process, providing users with a clear understanding of the sign-in link sent to their registered email address<br>- It offers helpful guidance on where to find the verification link if its not immediately visible.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- signin Submodule -->
							<details>
								<summary><b>signin</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.auth.signin</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/auth/signin/page.tsx'>page.tsx</a></b></td>
											<td style='padding: 8px;'>- Authenticates users through Google sign-in, allowing them to access the application with their existing Google account credentials<br>- This feature provides a seamless and secure way for users to log in and start using the app.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- signout Submodule -->
							<details>
								<summary><b>signout</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.app.auth.signout</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/app/auth/signout/page.tsx'>page.tsx</a></b></td>
											<td style='padding: 8px;'>- Handles the sign-out process by verifying user authentication and prompting a confirmation before logging out<br>- If the user is not signed in, redirects to the home page<br>- The component renders a form with a submit button to initiate the sign-out action, which updates the session state and redirects to the specified URL (in this case, the home page).</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- components Submodule -->
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.components</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/CanvasWalkthrough.tsx'>CanvasWalkthrough.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides an interactive walkthrough of the Canvas Access Key generation process, guiding users through a series of steps with accompanying images and descriptions<br>- The component allows users to navigate through the steps using previous and next buttons, making it easy to follow along and obtain their access key.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/CanvasKeyForm.tsx'>CanvasKeyForm.tsx</a></b></td>
							<td style='padding: 8px;'>Ive followed the instructions to avoid using phrases like This file" and kept the response concise within the 50-70 word limit.)</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/AssignmentList.tsx'>AssignmentList.tsx</a></b></td>
							<td style='padding: 8px;'>- Summary:** The <code>AssignmentList</code> component manages a list of assignments, allowing users to lock in their schedules by selecting dates and times<br>- It fetches current assignments, block rules, and user information from Supabase, and enables users to create new assignments or update existing ones.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/BlockListForm.tsx'>BlockListForm.tsx</a></b></td>
							<td style='padding: 8px;'>- Manages and updates a block list of websites**This React component enables users to manage a list of blocked websites, allowing them to add or remove sites from the list<br>- It fetches the initial block list data when the user is authenticated and displays the list with options to add new sites or remove existing ones.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/LinkClasses.tsx'>LinkClasses.tsx</a></b></td>
							<td style='padding: 8px;'>- Establishs Canvas access key management functionality within the application<br>- This component enables users to save, replace, and manage their Canvas keys, ensuring seamless integration with the assignment store<br>- The code handles key storage, validation, and updating, providing a user-friendly interface for managing Canvas connections.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/SignOutButton.tsx'>SignOutButton.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides the Sign Out Button component, enabling users to log out from the application with a single click<br>- This component utilizes NextAuths signOut function to securely handle the logout process, redirecting the user to the specified callback URL (in this case, the root path /').</td>
						</tr>
					</table>
					<!-- ui Submodule -->
					<details>
						<summary><b>ui</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.components.ui</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/input.tsx'>input.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a reusable React component for creating input fields with customizable styles and behaviors.This file defines an <code>Input</code> component that can be used to render HTML input elements with various attributes, such as type, class name, and reference<br>- The component also supports customization of its appearance through the use of utility functions from the projects lib/utils module.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/select.tsx'>select.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a customizable select component with various features such as trigger, content, label, item, and separator<br>- This component enables users to create interactive dropdown menus with options, allowing for easy selection and manipulation of data within the project structure.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/time-picker.tsx'>time-picker.tsx</a></b></td>
									<td style='padding: 8px;'>- MM AM/PM<br>- The component updates its state based on the selected date and provides an interface for users to manually input hours, minutes, and AM/PM<br>- It also includes a toggle button to switch between AM and PM modes.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/label.tsx'>label.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a customizable label component that renders a styled text element with optional peer-to-peer disabled state<br>- This reusable UI component is designed to be easily integrated into various parts of the application, offering a flexible and accessible way to display text-based content.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/button.tsx'>button.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a customizable button component that can be used across the application<br>- This component allows developers to easily create buttons with various styles, sizes, and behaviors, enhancing the overall user experience.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/calendar.tsx'>calendar.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a customizable calendar component that enables users to navigate through dates, with features such as showing outside days, customizing appearance, and selecting specific dates<br>- This reusable UI component is designed to be easily integrated into various applications, offering a flexible and user-friendly date-picking experience.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/sonner.tsx'>sonner.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides the Toaster component, a reusable UI element that integrates with the Sonner library to display toast notifications<br>- This component utilizes the Next Themes system to adapt its appearance based on the current theme, ensuring a consistent visual experience across different environments<br>- The Toaster component can be easily customized and styled through its props and CSS variables.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/ui/dialog.tsx'>dialog.tsx</a></b></td>
									<td style='padding: 8px;'>- Provides a set of reusable React components for creating modal dialogs with customizable overlay, content, header, footer, title, description, and close functionality<br>- The Dialog component serves as a wrapper for these individual components, allowing developers to easily create and customize their own dialog UIs within their applications.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- email Submodule -->
					<details>
						<summary><b>email</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.components.email</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/components/email/auth-template.tsx'>auth-template.tsx</a></b></td>
									<td style='padding: 8px;'>Defines the authentication email template component, rendering a personalized welcome message with the users first name.This component is part of the projects email handling system, enabling dynamic and user-specific communication within the application.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- trpc Submodule -->
			<details>
				<summary><b>trpc</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.trpc</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/trpc/server.ts'>server.ts</a></b></td>
							<td style='padding: 8px;'>Ive followed the instructions to avoid using phrases like This file" and kept the response concise, within the 50-70 word limit.)</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/trpc/react.tsx'>react.tsx</a></b></td>
							<td style='padding: 8px;'>- Establishes the foundation for React-based applications by providing a TRPCReactProvider component that integrates with the Trpc client and query client, enabling seamless API calls and caching<br>- This file sets up the necessary infrastructure for handling requests and responses between the client-side application and the server-side API.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/trpc/query-client.ts'>query-client.ts</a></b></td>
							<td style='padding: 8px;'>- Establishes the foundation for query management within the project by creating a QueryClient instance with custom configurations<br>- This includes setting default stale time and de/hydration options to optimize performance and data handling, ensuring seamless integration with server-side rendering (SSR) and React Query.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- styles Submodule -->
			<details>
				<summary><b>styles</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.styles</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/styles/globals.css'>globals.css</a></b></td>
							<td style='padding: 8px;'>- Establishes the visual foundation of the application by defining a set of customizable colors and typography styles<br>- The file imports Tailwind CSS and customizes its variants to create a unique color scheme, allowing developers to easily switch between light and dark modes<br>- It also defines various design elements, such as borders, input fields, and charts, providing a consistent visual identity for the application.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- lib Submodule -->
			<details>
				<summary><b>lib</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.lib</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/lib/utils.ts'>utils.ts</a></b></td>
							<td style='padding: 8px;'>Merges class values into a single string using clsx and tailwind-merge.This utility function enables the combination of multiple class values into a single string, facilitating efficient styling in CSS-based projects that utilize clsx and Tailwind.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/lib/supabaseClient.ts'>supabaseClient.ts</a></b></td>
							<td style='padding: 8px;'>- Establishes a connection to Supabase instance.This file configures the supabaseClient, enabling interaction with the Supabase database<br>- It retrieves environment variables for URL and anonymous key, then uses these credentials to create a client instance via the @supabase/supabase-js library<br>- This setup enables seamless integration of Supabase services within the project.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- pages Submodule -->
			<details>
				<summary><b>pages</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.pages</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/pages/test-db.tsx'>test-db.tsx</a></b></td>
							<td style='padding: 8px;'>- Provides test data for block list functionality by simulating a user session and retrieving the corresponding block list from the database<br>- This component serves as an integration point between the frontend and backend, allowing developers to verify the correctness of their block list implementation.</td>
						</tr>
					</table>
					<!-- api Submodule -->
					<details>
						<summary><b>api</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.pages.api</b></code>
							<!-- auth Submodule -->
							<details>
								<summary><b>auth</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.pages.api.auth</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/pages/api/auth/extension.ts'>extension.ts</a></b></td>
											<td style='padding: 8px;'>- Authenticates users through Google OAuth and retrieves their Supabase session.This file serves as a gateway to the extensions functionality, ensuring that only authenticated users can access the API<br>- It leverages Next.js, Next-auth, and Supabase to handle user sessions and provide seamless integration with the extension.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- server Submodule -->
			<details>
				<summary><b>server</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.server</b></code>
					<!-- actions Submodule -->
					<details>
						<summary><b>actions</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.server.actions</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/actions/canvas.ts'>canvas.ts</a></b></td>
									<td style='padding: 8px;'>- Retrieve unsubmitted assignments for a users courses by authenticating with Canvas API and parsing Link headers to handle pagination<br>- The <code>getUserInfo</code> function retrieves user information, including courses and their assignments, then filters and categorizes assignments into submitted and unsubmitted based on due dates and submission status.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/actions/check_assignments.ts'>check_assignments.ts</a></b></td>
									<td style='padding: 8px;'>- This code checks if all assignments are submitted for a user, ensuring no pending tasks remain<br>- It fetches the users current assignments, verifies submission status for each, and removes completed assignments from the database<br>- If any assignment remains unsubmitted, it returns false to indicate blocking is necessary.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- db Submodule -->
					<details>
						<summary><b>db</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.server.db</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/db/blocklist.ts'>blocklist.ts</a></b></td>
									<td style='padding: 8px;'>Getting a users current blocklist, adding or updating a site to their blocklist, and removing a site from their blocklist.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/db/schema.ts'>schema.ts</a></b></td>
									<td style='padding: 8px;'>- Defines the schema for the userSettings table within the database, establishing relationships between columns such as id, userId, and createdAt<br>- This file provides a blueprint for storing and retrieving user settings data, ensuring consistency and integrity across the entire project.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/db/index.ts'>index.ts</a></b></td>
									<td style='padding: 8px;'>- Configures Supabase client instance for the entire project, ensuring seamless integration with the database<br>- This file sets up a singleton instance of the Supabase client using environment variables, providing a centralized access point to the database throughout the application.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- api Submodule -->
					<details>
						<summary><b>api</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.server.api</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/api/root.ts'>root.ts</a></b></td>
									<td style='padding: 8px;'>- Establishes the primary API router for the server, aggregating routers from various modules into a single instance<br>- This centralizes API routing and enables easy management of endpoints<br>- The file also exports a type definition for the API and provides a factory function to create a server-side caller for the tRPC API.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/api/trpc.ts'>trpc.ts</a></b></td>
									<td style='padding: 8px;'>- Establishes the foundation for a tRPC server by initializing the API context, creating a caller factory, and defining routers and procedures<br>- The code sets up middleware for timing procedure execution and adds artificial delay in development<br>- It also defines public and protected procedures, allowing for authenticated and unauthorized access to API endpoints.Note: Ive avoided using words like This file and kept the response concise within the 50-70 word limit.</td>
								</tr>
							</table>
							<!-- routers Submodule -->
							<details>
								<summary><b>routers</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.server.api.routers</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/api/routers/canvas.ts'>canvas.ts</a></b></td>
											<td style='padding: 8px;'>- Establishes a router for canvas-related API endpoints, enabling secure interactions with the server<br>- The <code>canvasRouter</code> provides a single mutation procedure, <code>saveKey</code>, which accepts a canvas key as input and saves it to storage, returning associated assignments<br>- This module integrates with the TRPC framework and utilizes Zod schema validation for robust data processing.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/api/routers/post.ts'>post.ts</a></b></td>
											<td style='padding: 8px;'>Hello<code>, which generates greetings based on user input; </code>create<code>, which creates new posts with unique IDs and names; </code>getLatest<code>, which retrieves the latest post; and </code>getSecretMessage`, which reveals a secret message to authorized users.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- auth Submodule -->
					<details>
						<summary><b>auth</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.server.auth</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/auth/index.ts'>index.ts</a></b></td>
									<td style='padding: 8px;'>- Authenticates users by managing sessions and redirects for sign-in and sign-out operations within the Next.js application.This file serves as a central hub for authentication-related logic, providing functions to retrieve session data, trigger sign-in and sign-out redirects, and cache auth calls<br>- It integrates with NextAuth to handle API routes and provides a unified interface for handling user authentication.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/src/server/auth/config.ts'>config.ts</a></b></td>
									<td style='padding: 8px;'>- Configures NextAuth.js authentication options, enabling Google sign-in and custom session handling<br>- The file defines a set of providers, including Google, and specifies the secret key, session strategy, and callback functions to handle sign-in and session management<br>- This module provides a foundation for secure user authentication within the project.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- supabase Submodule -->
	<details>
		<summary><b>supabase</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ supabase</b></code>
			<!-- migrations Submodule -->
			<details>
				<summary><b>migrations</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ supabase.migrations</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/davidshukhin/lockedout/blob/master/supabase/migrations/20240320000000_add_scheduled_time.sql'>20240320000000_add_scheduled_time.sql</a></b></td>
							<td style='padding: 8px;'>- Adds scheduled time column to the current_assignments table.This migration enhances the projects scheduling capabilities by introducing a timestamp field to track assignments' scheduled times<br>- The change enables more accurate and organized tracking of assignment deadlines, streamlining workflows within the system.</td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm, Yarn

### Installation

Build lockedout from the source and intsall dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/davidshukhin/lockedout
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd lockedout
    ```

3. **Install the dependencies:**

<!-- SHIELDS BADGE CURRENTLY DISABLED -->
	<!-- [![npm][npm-shield]][npm-link] -->
	<!-- REFERENCE LINKS -->
	<!-- [npm-shield]: https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white -->
	<!-- [npm-link]: https://www.npmjs.com/ -->

	**Using [npm](https://www.npmjs.com/):**

	```sh
	❯ npm install
	```
<!-- SHIELDS BADGE CURRENTLY DISABLED -->
	<!-- [![yarn][yarn-shield]][yarn-link] -->
	<!-- REFERENCE LINKS -->
	<!-- [yarn-shield]: None -->
	<!-- [yarn-link]: None -->

	**Using [yarn](None):**

	```sh
	❯ echo 'INSERT-INSTALL-COMMAND-HERE'
	```

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**
```sh
npm start
```
**Using [yarn](None):**
```sh
echo 'INSERT-RUN-COMMAND-HERE'
```

### Testing

Lockedout uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**
```sh
npm test
```
**Using [yarn](None):**
```sh
echo 'INSERT-TEST-COMMAND-HERE'
```

---

## Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## Contributing

- **💬 [Join the Discussions](https://github.com/davidshukhin/lockedout/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/davidshukhin/lockedout/issues)**: Submit bugs found or log feature requests for the `lockedout` project.
- **💡 [Submit Pull Requests](https://github.com/davidshukhin/lockedout/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/davidshukhin/lockedout
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/davidshukhin/lockedout/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=davidshukhin/lockedout">
   </a>
</p>
</details>

---

## License

Lockedout is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="right">

[![][back-to-top]](#top)

</div>


[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square


---
