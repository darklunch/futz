FUTz: The Fair Use & Accessibility Toolkit

FUTz (pronounced "foots," from Fair Use Toolz) is a client-side browser userscript that provides a suite of tools to aid researchers, journalists, students, and users with disabilities in accessing and reading web content.

This script does not perform any automatic actions. It is a user-controlled toolkit that empowers individuals to exercise their legal rights under the Fair Use doctrine of the U.S. Copyright Act (17 U.S.C. § 107) and enhances web accessibility.
Core Principles & Legal Framework

This project is built on the following principles to ensure it operates as a lawful and ethical tool:
1. User-Controlled and Non-Automated

The script does nothing on its own. Every action must be deliberately initiated by the user through a menu command. This design places the responsibility for lawful use squarely on the user, who must determine if their specific use case qualifies as Fair Use.
2. Client-Side Operation Only

This toolkit operates exclusively within the user's browser. It only manipulates page data that has already been sent to the client. It does not "hack," decrypt, or access any non-public server data. Its function is to re-organize and un-obstruct content that is already present but may be difficult to access.
3. Empowering Lawful Use Cases

The primary purpose of this toolkit is to facilitate legally protected activities, including:

    Research & Scholarship: Researchers often need to access numerous articles for meta-analysis, data collection, and citation. This toolkit aids in managing metered access and viewing content for academic purposes.

    Journalism, Criticism & Commentary: Journalists require access to information to report on events, verify facts, and provide commentary. The tools here assist in this news-gathering process.

    Education: Students and educators can use these tools to access materials for classroom discussion, research projects, and educational assignments under Fair Use guidelines.

    Accessibility: Users with print disabilities, ADHD, or other conditions can benefit immensely from the Reader Mode, which removes distracting visual elements. The DOM Reset function can remove overlays that interfere with screen reader software.

Toolkit Features

The script adds the following commands to the Tampermonkey menu:

    Clear Site Storage & Reload: Resets site data (cookies, local storage) to help manage metered access for research purposes.

    Remove Obstructive Elements: A tool to remove non-content elements like pop-up modals, sticky banners, and overlays that interfere with reading or screen readers.

    Enter Reader Mode: Extracts the main article content into a clean, simplified, and clutter-free view, significantly improving readability and accessibility.

    Search Headline on Google: A convenience tool that helps users find the canonical source of an article or alternative versions via a public search engine, a common step in academic research.

    Lookup in External Archives: Provides one-click links to public web archives (like Archive.today, 12ft.io). This is a critical tool for researchers and digital archivists needing access to historical or preserved versions of a webpage.

Installation

    You must have a userscript manager installed in your browser, such as Tampermonkey, Violentmonkey, or Greasemonkey.

    Navigate to the script file (futz-toolkit.user.js) in this repository and click the [RAW] button.

    Your userscript manager will open a new tab and ask you to confirm the installation.

Legal Disclaimer

This tool is provided for educational, research, and accessibility purposes. It is a general-purpose tool, and its functions may have unintended consequences on some websites. The responsibility for ensuring compliance with all applicable laws, including copyright law and website terms of service, rests solely with the user. The developers of this script are not liable for its misuse.
License

This project is licensed under the MIT License.
