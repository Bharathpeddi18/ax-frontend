'use client';

import { useEffect, useState } from 'react';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import Icon from '@/assets/icons';

// region Types
interface PolicyItem {
  id: string;
  parentId: string;
  type: 'folder' | 'file';
  title: string;
  extension: string | null;
  fileUrl: string | null;
  fileSize: string | null;
  isArchived: string;
  modifiedBy: string;
  modifiedDate: string;
}

// region Helper
function buildTree(items: PolicyItem[], parentId = '0'): PolicyItem[] {
  return items.filter((i) => i.parentId === parentId && i.isArchived !== 'Yes');
}

// region Sub-component: Tree Node
function TreeNode({ item, allItems }: { item: PolicyItem; allItems: PolicyItem[] }) {
  const [open, setOpen] = useState(false);
  const children = buildTree(allItems, item.id);
  const hasChildren = children.length > 0;

  const iconName = item.type === 'folder' ? (open ? 'folder-open' : 'folder') : 'file';

  return (
    <div className="ax-flex ax-flex-col">
      <div
        className={`ax-flex ax-items-center ax-gap-2 ax-px-3 ax-py-2 ax-rounded-lg ax-cursor-pointer hover:ax-bg-gray-100 ax-transition-colors ax-group`}
        onClick={() => item.type === 'folder' ? setOpen((o) => !o) : item.fileUrl ? window.open(item.fileUrl, '_blank') : undefined}
      >
        <span className="ax-text-primary ax-shrink-0">
          <Icon name={iconName} size={18} />
        </span>
        <span className="ax-text-sm ax-font-medium ax-text-gray-800 ax-flex-1">{item.title}</span>
        {item.extension && (
          <span className="ax-text-xs ax-bg-gray-100 ax-text-gray-500 ax-rounded ax-px-1.5 ax-py-0.5 ax-uppercase ax-font-mono">{item.extension}</span>
        )}
        {item.fileSize && (
          <span className="ax-text-xs ax-text-gray-400">{item.fileSize}</span>
        )}
        {item.type === 'folder' && hasChildren && (
          <span className="ax-text-gray-400 ax-text-xs">{open ? '▾' : '▸'}</span>
        )}
        {item.type === 'file' && item.fileUrl && (
          <span className="ax-text-xs ax-text-primary ax-opacity-0 group-hover:ax-opacity-100 ax-transition-opacity">Download</span>
        )}
      </div>

      {item.type === 'folder' && open && hasChildren && (
        <div className="ax-pl-6 ax-border-l ax-border-gray-200 ax-ml-4 ax-mt-1 ax-flex ax-flex-col ax-gap-1">
          {children.map((child) => (
            <TreeNode key={child.id} item={child} allItems={allItems} />
          ))}
        </div>
      )}
    </div>
  );
}

// region Main Component
export default function PolicyMemosGuidelines() {
  const [items, setItems] = useState<PolicyItem[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/sample/content-management/policy-memos-guidelines.json', { signal: controller.signal, cache: 'no-store' })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const roots = buildTree(items, '0');

  return (
    <div className="ax-flex ax-flex-col ax-gap-3">
      <div className="ax-flex ax-items-center ax-justify-between">
        <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">Policy Memos & Guidelines</h3>
        <AXButton
          propsLabel="Upload"
          propsStartIcon={<Icon name="upload" size={18} />}
          propsSize="sm"
          propsClassName="ax-bg-primary ax-text-white ax-rounded-md ax-ps-1"
          onClick={() => alert('File upload coming soon.')}
        />
      </div>

      <div className="ax-bg-white ax-border ax-border-gray-200 ax-rounded-xl ax-shadow-sm ax-p-4 ax-flex ax-flex-col ax-gap-1">
        {roots.length === 0 ? (
          <div className="ax-text-gray-500 ax-py-8 ax-text-center ax-bg-gray-50 ax-rounded-xl">
            No documents found.
          </div>
        ) : (
          roots.map((item) => (
            <TreeNode key={item.id} item={item} allItems={items} />
          ))
        )}
      </div>
    </div>
  );
}
