'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

interface MainLayoutProps {
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
}

export default function MainLayout({ sidebar, mainContent }: MainLayoutProps) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-full"
    >
      <ResizablePanel defaultSize={25}>
        <div className="p-4 h-full">{sidebar}</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="p-4 h-full">{mainContent}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}