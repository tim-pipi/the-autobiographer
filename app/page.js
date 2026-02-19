'use client';

import React, { useState } from 'react';
import { BookOpen, Eye, CheckCircle, RotateCcw } from 'lucide-react';

const AutobiographerGame = () => {
  const [phase, setPhase] = useState('intro');
  const [currentEvent, setCurrentEvent] = useState(0);
  const [selectedLens, setSelectedLens] = useState(null);
  const [personalGoodScore, setPersonalGoodScore] = useState(50);
  const [narrativeChoices, setNarrativeChoices] = useState({});
  const [hasViewedAllEvents, setHasViewedAllEvents] = useState(false);

  const lifeEvents = [
    {
      id: 'A',
      title: 'The Failed Application',
      fact: 'You applied to medical school three times over three years. Each time, you were rejected.',
      lenses: {
        victim: {
          text: 'The system was rigged against people like me. No matter how hard I worked, the admissions committees never gave me a fair chance. Three years of my life, wasted.',
          impact: -15
        },
        strategist: {
          text: 'Each rejection taught me what the committees valued. By the third attempt, I understood the game—I just needed to decide if I wanted to keep playing it or find another path.',
          impact: 10
        },
        learner: {
          text: 'Those rejections forced me to ask why I wanted to be a doctor in the first place. The answer evolved each year, revealing deeper truths about what kind of work truly mattered to me.',
          impact: 15
        }
      }
    },
    {
      id: 'B',
      title: 'The Compromise Job',
      fact: 'You took a research position at a pharmaceutical company—not the clinical work you dreamed of, but it paid the bills.',
      lenses: {
        victim: {
          text: 'I settled for corporate research because I had no other options. Every day in that lab reminded me I wasn\'t where I was supposed to be—I was living someone else\'s life.',
          impact: -10
        },
        strategist: {
          text: 'The research role gave me a foothold in healthcare while I figured out my next move. I was getting paid to learn about drug development, building expertise that could open doors.',
          impact: 8
        },
        learner: {
          text: 'Working in the lab showed me a different side of medicine—how treatments are born before they ever reach patients. I discovered I could make an impact without wearing a white coat.',
          impact: 14
        }
      }
    },
    {
      id: 'C',
      title: 'The Unexpected Opportunity',
      fact: 'A colleague asked you to help design a patient education program. You said yes, even though it meant extra unpaid hours.',
      lenses: {
        victim: {
          text: 'Of course they asked me to do extra work for free. People always take advantage of those desperate to prove themselves. I had no choice but to say yes.',
          impact: -12
        },
        strategist: {
          text: 'This side project was my chance to demonstrate skills the company didn\'t know I had. If I did it well, I could create my own role—one that didn\'t exist before I showed them what was possible.',
          impact: 10
        },
        learner: {
          text: 'Creating educational materials for patients felt surprisingly meaningful. I was translating complex science into hope and understanding. Maybe this was a form of healing I hadn\'t considered.',
          impact: 16
        }
      }
    },
    {
      id: 'D',
      title: 'The New Direction',
      fact: 'Five years later, you\'re now Director of Patient Education at a biotech firm, having never gone to medical school.',
      lenses: {
        victim: {
          text: 'I ended up here by default, not by choice. This isn\'t the life I planned. Every accomplishment feels hollow because it\'s not what I originally wanted.',
          impact: -8
        },
        strategist: {
          text: 'I pivoted successfully. When one door closed, I built my own entrance. The rejections forced me into a niche where I could excel without the traditional credentials.',
          impact: 12
        },
        learner: {
          text: 'Those rejections led me somewhere I never would have found otherwise. I help thousands of patients understand their conditions—a different kind of care than I imagined, but no less valuable.',
          impact: 18
        }
      }
    }
  ];

  const lensDescriptions = {
    victim: {
      name: 'The Victim',
      description: 'Events happened TO you. You were acted upon by forces beyond your control.',
      color: 'from-red-500 to-orange-500'
    },
    strategist: {
      name: 'The Strategist',
      description: 'You made calculated decisions. Every choice was part of a larger plan.',
      color: 'from-blue-500 to-purple-500'
    },
    learner: {
      name: 'The Learner',
      description: 'Life was your teacher. Each experience contributed to your growth.',
      color: 'from-green-500 to-emerald-500'
    }
  };

  const handleEventComplete = () => {
    if (currentEvent < lifeEvents.length - 1) {
      setCurrentEvent(currentEvent + 1);
    } else {
      setHasViewedAllEvents(true);
      setPhase('editor');
    }
  };

  const handleLensChoice = (eventId, lensType) => {
    const event = lifeEvents.find(e => e.id === eventId);
    const impact = event.lenses[lensType].impact;
    
    setNarrativeChoices({
      ...narrativeChoices,
      [eventId]: lensType
    });
    
    setPersonalGoodScore(prev => Math.max(0, Math.min(100, prev + impact)));
  };

  const canSubmit = () => {
    return Object.keys(narrativeChoices).length === lifeEvents.length;
  };

  const getDominantLens = () => {
    const counts = { victim: 0, strategist: 0, learner: 0 };
    Object.values(narrativeChoices).forEach(lens => counts[lens]++);
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const renderIntro = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-10 h-10 text-purple-300" />
          <h1 className="text-4xl font-bold text-white">The Autobiographer</h1>
        </div>
        
        <div className="space-y-4 text-purple-100 mb-8">
          <p className="text-lg">
            Most games are about making choices that change the future. This game is different.
          </p>
          <p>
            In <strong>The Autobiographer</strong>, you'll discover that the facts of your life are unchangeable—but their meaning is not.
          </p>
          <p>
            You will experience the same sequence of events twice:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Phase 1:</strong> The Facts - A timeline of events that cannot be altered</li>
            <li><strong>Phase 2:</strong> The Editor - Reinterpret these events through different narrative lenses</li>
            <li><strong>Phase 3:</strong> The Recounting - Submit your cohesive story</li>
          </ul>
          <p className="text-sm italic border-l-4 border-purple-400 pl-4 mt-6">
            "The story of a life is not simply a chronicle of what happened, but a narrative that gives those happenings meaning."
          </p>
        </div>

        <button
          onClick={() => setPhase('facts')}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          Begin Your Story
        </button>
      </div>
    </div>
  );

  const renderFacts = () => {
    const event = lifeEvents[currentEvent];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Phase 1: The Facts</h2>
              <span className="text-purple-300">Event {currentEvent + 1} of {lifeEvents.length}</span>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-white mb-4">{event.title}</h3>
              <p className="text-purple-100 text-lg leading-relaxed">{event.fact}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-purple-300 mb-6">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${((currentEvent + 1) / lifeEvents.length) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-purple-200 mb-6 italic">
              This is what happened. The facts are immutable. Click to continue.
            </p>

            <button
              onClick={handleEventComplete}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 rounded-lg font-semibold hover:from-slate-500 hover:to-slate-600 transition-all"
            >
              {currentEvent < lifeEvents.length - 1 ? 'Next Event' : 'Enter The Editor'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEditor = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-purple-300" />
                <h2 className="text-3xl font-bold text-white">Phase 2: The Editor</h2>
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-300 mb-1">Personal Good Score</div>
                <div className="text-3xl font-bold text-white">{personalGoodScore}</div>
              </div>
            </div>
            <p className="text-purple-100">
              The facts remain the same. But through which lens will you view them? Choose a narrative for each event to construct a cohesive story.
            </p>
          </div>

          {/* Lens Selection Guide */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Object.entries(lensDescriptions).map(([key, lens]) => (
              <div 
                key={key}
                className={`bg-gradient-to-br ${lens.color} p-4 rounded-xl text-white`}
              >
                <h3 className="font-bold text-lg mb-2">{lens.name}</h3>
                <p className="text-sm opacity-90">{lens.description}</p>
              </div>
            ))}
          </div>

          {/* Events with Lens Choices */}
          <div className="space-y-6">
            {lifeEvents.map((event) => (
              <div key={event.id} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                <p className="text-purple-200 mb-4 text-sm italic">{event.fact}</p>
                
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(event.lenses).map(([lensType, lensData]) => {
                    const isSelected = narrativeChoices[event.id] === lensType;
                    const lensInfo = lensDescriptions[lensType];
                    
                    return (
                      <button
                        key={lensType}
                        onClick={() => handleLensChoice(event.id, lensType)}
                        className={`text-left p-4 rounded-lg transition-all ${
                          isSelected 
                            ? `bg-gradient-to-r ${lensInfo.color} text-white shadow-lg scale-105` 
                            : 'bg-slate-800/50 text-purple-100 hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="font-semibold mb-1 text-sm">{lensInfo.name}</div>
                            <p className="text-sm leading-relaxed">{lensData.text}</p>
                          </div>
                          <div className={`text-xs font-bold px-2 py-1 rounded ${
                            lensData.impact > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                          }`}>
                            {lensData.impact > 0 ? '+' : ''}{lensData.impact}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => canSubmit() && setPhase('recounting')}
            disabled={!canSubmit()}
            className={`w-full mt-8 py-4 rounded-lg font-semibold text-lg transition-all ${
              canSubmit()
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform hover:scale-105'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {canSubmit() ? 'Submit Your Story' : `Choose narratives for all ${lifeEvents.length} events`}
          </button>
        </div>
      </div>
    );
  };

  const renderRecounting = () => {
    const dominantLens = getDominantLens();
    const lensInfo = lensDescriptions[dominantLens];
    
    let outcome = '';
    let outcomeColor = '';
    
    if (personalGoodScore >= 70) {
      outcome = 'Flourishing';
      outcomeColor = 'from-green-400 to-emerald-400';
    } else if (personalGoodScore >= 40) {
      outcome = 'Navigating';
      outcomeColor = 'from-yellow-400 to-orange-400';
    } else {
      outcome = 'Struggling';
      outcomeColor = 'from-red-400 to-pink-400';
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
              <h2 className="text-3xl font-bold text-white">Phase 3: The Recounting</h2>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">Your Story</h3>
              <div className="space-y-4">
                {lifeEvents.map((event) => {
                  const chosenLens = narrativeChoices[event.id];
                  const narrative = event.lenses[chosenLens];
                  const lensStyle = lensDescriptions[chosenLens];
                  
                  return (
                    <div key={event.id} className="border-l-4 pl-4 py-2" style={{ borderColor: `var(--${chosenLens}-color)` }}>
                      <h4 className="font-semibold text-purple-200 mb-1">{event.title}</h4>
                      <p className="text-purple-100 italic mb-1">{narrative.text}</p>
                      <span className={`text-xs px-2 py-1 rounded bg-gradient-to-r ${lensStyle.color} text-white inline-block`}>
                        {lensStyle.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
                <h4 className="text-sm text-purple-300 mb-2">Dominant Narrative Lens</h4>
                <p className={`text-2xl font-bold bg-gradient-to-r ${lensInfo.color} bg-clip-text text-transparent`}>
                  {lensInfo.name}
                </p>
                <p className="text-sm text-purple-200 mt-2">{lensInfo.description}</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-400/30">
                <h4 className="text-sm text-blue-300 mb-2">Life Quality Assessment</h4>
                <p className={`text-2xl font-bold bg-gradient-to-r ${outcomeColor} bg-clip-text text-transparent`}>
                  {outcome}
                </p>
                <p className="text-sm text-blue-200 mt-2">Personal Good Score: {personalGoodScore}/100</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-6 border border-indigo-400/30 mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Reflection</h4>
              <p className="text-purple-100 leading-relaxed">
                The facts of your journey never changed—three rejections, a research job, an extra project, a new career path—but the story you told about it shaped whether it felt like 
                {personalGoodScore >= 70 ? ' a triumph of adaptation' : personalGoodScore >= 40 ? ' a winding journey' : ' a series of disappointments'}.
                You viewed your life primarily through the lens of <strong>{lensInfo.name.toLowerCase()}</strong>, 
                which {dominantLens === 'learner' ? 'emphasized growth and the discovery of unexpected meaning' : dominantLens === 'strategist' ? 'highlighted agency and intentional pivoting' : 'focused on external forces and limitations'}.
              </p>
              <p className="text-purple-100 leading-relaxed mt-4">
                This is Connie Rosati's insight: we are the autobiographers of our own lives. The narrative relations we construct 
                between events don't just describe our past—they actively shape our sense of personal good. The same sequence of facts can constitute either a life well-lived or a life of regret, depending on the story we tell.
              </p>
            </div>

            <button
              onClick={() => {
                setPhase('intro');
                setCurrentEvent(0);
                setSelectedLens(null);
                setPersonalGoodScore(50);
                setNarrativeChoices({});
                setHasViewedAllEvents(false);
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Tell a Different Story
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {phase === 'intro' && renderIntro()}
      {phase === 'facts' && renderFacts()}
      {phase === 'editor' && renderEditor()}
      {phase === 'recounting' && renderRecounting()}
    </div>
  );
};

export default function Home() {
  return <AutobiographerGame />;
}