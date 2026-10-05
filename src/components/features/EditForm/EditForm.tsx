import { type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@/components/shared/BaseButton/BaseButton';
import { BaseInput } from '@/components/shared/BaseInput/BaseInput';
import { BaseLabel } from '@/components/shared/BaseLabel/BaseLabel';
import { buttons, colorInput, colorRow, form } from './EditForm.css';

export type EditValues = { title: string; url: string; color: string };

type EditFormProps = {
  titleLabel: string;
  titlePlaceholder?: string;
  titleRequired?: boolean;
  showUrl?: boolean;
  initial: EditValues;
  onColorPreview: (color: string | undefined) => void;
  onSubmit: (values: EditValues) => void;
  onCancel: () => void;
};

export function EditForm({
  titleLabel,
  titlePlaceholder,
  titleRequired = false,
  showUrl = false,
  initial,
  onColorPreview,
  onSubmit,
  onCancel,
}: EditFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initial.title);
  const [url, setUrl] = useState(initial.url);
  const [color, setColor] = useState(initial.color);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ title: title.trim(), url: url.trim(), color });
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <BaseLabel htmlFor="editTitle">
        {titleLabel}
        <BaseInput
          id="editTitle"
          name="title"
          value={title}
          placeholder={titlePlaceholder}
          required={titleRequired}
          onChange={(event) => setTitle(event.target.value)}
        />
      </BaseLabel>
      {showUrl && (
        <BaseLabel htmlFor="editUrl">
          URL
          <BaseInput
            id="editUrl"
            name="url"
            type="url"
            value={url}
            required
            onChange={(event) => setUrl(event.target.value)}
          />
        </BaseLabel>
      )}
      <BaseLabel htmlFor="editColor">
        {t('edit.borderColor')}
        <span className={colorRow}>
          <BaseInput
            id="editColor"
            className={colorInput}
            name="color"
            type="color"
            value={color || '#2563eb'}
            onChange={(event) => {
              setColor(event.target.value);
              onColorPreview(event.target.value);
            }}
          />
          <BaseButton
            type="button"
            variant="secondary"
            onClick={() => {
              setColor('');
              onColorPreview('');
            }}
          >
            {t('edit.reset')}
          </BaseButton>
        </span>
      </BaseLabel>
      <div className={buttons}>
        <BaseButton type="submit">{t('edit.save')}</BaseButton>
        <BaseButton type="button" variant="secondary" onClick={onCancel}>
          {t('edit.cancel')}
        </BaseButton>
      </div>
    </form>
  );
}
