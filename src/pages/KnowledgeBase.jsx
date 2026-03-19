import { useState } from 'react';
import { Plus, Search, Book, Eye } from 'lucide-react';
import { knowledgeBaseArticles } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import Modal from '../components/ui/Modal';

export default function KnowledgeBase() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = knowledgeBaseArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(knowledgeBaseArticles.map(a => a.category))];

  return (
    <div>
      <PageHeader
        title="Knowledge Base"
        subtitle="Browse and manage help articles"
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
            <Plus size={14} /> New Article
          </button>
        }
      />

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          className="input-field pl-11 py-3 text-base"
          placeholder="Search knowledge base..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button className="btn-primary text-xs">All</button>
        {categories.map(cat => (
          <button key={cat} className="btn-secondary text-xs">{cat}</button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(article => (
          <div key={article.id} className="glass-card p-5 hover:border-primary-500/30 cursor-pointer transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                <Book size={18} className="text-primary-400" />
              </div>
              <span className="badge-blue text-xs">{article.category}</span>
            </div>
            <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">{article.title}</h3>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Eye size={12} />
                <span>{article.views} views</span>
              </div>
              <span>Updated {article.updated}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Article" size="lg">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Article Title *</label>
            <input className="input-field" placeholder="Article title" />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Category</label>
            <select className="input-field">
              {categories.map(c => <option key={c}>{c}</option>)}
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Content</label>
            <textarea className="input-field" rows={8} placeholder="Write article content..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
            <button className="btn-primary">Publish Article</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
