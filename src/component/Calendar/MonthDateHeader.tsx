import React from 'react';
import {moment} from 'obsidian';
import {DateHeaderProps} from 'react-big-calendar';
import {getDailyNote} from 'obsidian-daily-notes-interface';
import useFileStore from '@/stores/fileStore';

const MOOD_PROPERTY = 'mood';

// Month view date header: the day number plus the daily note's mood emoji, e.g. "mood: 😫 awful" → 😫
const MonthDateHeader: React.FC<DateHeaderProps> = ({label, date, onDrillDown}) => {
  const app = useFileStore((state) => state.app);
  const files = useFileStore((state) => state.files);

  const note = files ? getDailyNote(moment(date), files) : null;
  const mood = note && app?.metadataCache.getFileCache(note)?.frontmatter?.[MOOD_PROPERTY];
  const emoji = typeof mood === 'string' ? mood.trim().split(/\s+/)[0] : '';

  return (
    <>
      {emoji && <span className="big-calendar-mood">{emoji}</span>}
      <button type="button" className="rbc-button-link" onClick={onDrillDown}>
        {label}
      </button>
    </>
  );
};

export default MonthDateHeader;
