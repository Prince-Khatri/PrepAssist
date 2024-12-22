"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
    themeContent: string;
}

const RenderMarkdown = ({ themeContent }: Props) => {
    return (
        <div className="markdown-body dark:!bg-zinc-950 h-[calc(100%-80px)] w-full overflow-y-auto box-border p-4">
            <ReactMarkdown className="dark:bg-zinc-950 dark:text-white transition-all ease-in" children={themeContent} rehypePlugins={[rehypeRaw]} />
        </div>
    )
}

export default RenderMarkdown