import { useTranslation } from 'react-i18next';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseList } from '@/components/shared/BaseList/BaseList';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import '@/styles/theme.css';
import clsx from 'clsx';
import { CopyrightFooter } from '@/components/features/CopyrightFooter/CopyrightFooter';
import { DashboardHeader } from '@/components/features/DashboardHeader/DashboardHeader';
import * as styles from './Help.css';

export default function Help() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('help.features.0.title'),
      description: t('help.features.0.description'),
    },
    {
      title: t('help.features.1.title'),
      description: t('help.features.1.description'),
    },
    {
      title: t('help.features.2.title'),
      description: t('help.features.2.description'),
    },
    {
      title: t('help.features.3.title'),
      description: t('help.features.3.description'),
    },
  ];

  const steps = [
    {
      label: 'Step 1',
      title: t('help.steps.0.title'),
      text: t('help.steps.0.text'),
    },
    {
      label: 'Step 2',
      title: t('help.steps.1.title'),
      text: t('help.steps.1.text'),
    },
    {
      label: 'Step 3',
      title: t('help.steps.2.title'),
      text: t('help.steps.2.text'),
    },
    {
      label: 'Step 4',
      title: t('help.steps.3.title'),
      text: t('help.steps.3.text'),
    },
  ];

  const quickActions = [
    { name: t('header.add'), note: t('help.actions.0.note') },
    { name: t('header.addGroup'), note: t('help.actions.1.note') },
    { name: t('header.refresh'), note: t('help.actions.2.note') },
    { name: t('header.settings'), note: t('help.actions.3.note') },
  ];

  return (
    <>
      <DashboardHeader />
      <main className={styles.helpPage}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <BaseText className={styles.eyebrow}>RSS Decks</BaseText>
            <BaseHeading hLv="1" className={styles.heroTitle}>
              {t('help.heroTitle')}
            </BaseHeading>
            <BaseText color="soft" className={styles.lead}>
              {t('help.lead')}
            </BaseText>
            <div className={styles.heroActions}>
              <BaseLink
                external={false}
                href="#how-to-use"
                className={clsx(styles.button, styles.buttonPrimary)}
              >
                {t('help.toHowTo')}
              </BaseLink>
              <BaseLink
                external={false}
                href="#features"
                className={clsx(styles.button, styles.buttonSecondary)}
              >
                {t('help.toFeatures')}
              </BaseLink>
              <BaseLink
                external={false}
                href="/feed.html"
                className={clsx(styles.button, styles.buttonSecondary)}
              >
                {t('help.toDashboard')}
              </BaseLink>
            </div>
            <BaseList className={styles.metrics} aria-label={t('help.metricsLabel')}>
              <li className={styles.metricsItem}>
                <strong className={styles.metricsStrong}>{t('help.metrics.0.title')}</strong>
                <BaseText as="span" color="soft">
                  {t('help.metrics.0.text')}
                </BaseText>
              </li>
              <li className={styles.metricsItem}>
                <strong className={styles.metricsStrong}>{t('help.metrics.1.title')}</strong>
                <BaseText as="span" color="soft">
                  {t('help.metrics.1.text')}
                </BaseText>
              </li>
              <li className={styles.metricsItem}>
                <strong className={styles.metricsStrong}>{t('help.metrics.2.title')}</strong>
                <BaseText as="span" color="soft">
                  {t('help.metrics.2.text')}
                </BaseText>
              </li>
            </BaseList>
          </div>
        </section>

        <section id="features" className={styles.section}>
          <div className={styles.sectionHeader}>
            <BaseText className={styles.eyebrow}>Features</BaseText>
            <BaseHeading hLv="2" className={styles.sectionTitle}>
              {t('help.featuresTitle')}
            </BaseHeading>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <div className={styles.featureCardBadge} aria-hidden="true">
                  ✓
                </div>
                <BaseHeading hLv="3" className={styles.featureCardTitle}>
                  {feature.title}
                </BaseHeading>
                <BaseText color="soft" className={styles.bodyText}>
                  {feature.description}
                </BaseText>
              </article>
            ))}
          </div>
        </section>

        <section id="how-to-use" className={clsx(styles.section, styles.sectionAlt)}>
          <div className={styles.sectionHeader}>
            <BaseText className={styles.eyebrow}>How to use</BaseText>
            <BaseHeading hLv="2" className={styles.sectionTitle}>
              {t('help.howToTitle')}
            </BaseHeading>
          </div>
          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.label} className={styles.step}>
                <span className={styles.stepLabel}>{step.label}</span>
                <BaseHeading hLv="3" className={styles.stepTitle}>
                  {step.title}
                </BaseHeading>
                <BaseText color="soft" className={styles.bodyText}>
                  {step.text}
                </BaseText>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.callout}>
            <div>
              <BaseText className={styles.eyebrow}>Quick actions</BaseText>
              <BaseHeading hLv="2" className={styles.calloutTitle}>
                {t('help.quickTitle')}
              </BaseHeading>
            </div>
            <div className={styles.actionList}>
              {quickActions.map((action) => (
                <div key={action.name} className={styles.actionItem}>
                  <span className={styles.actionItemName}>{action.name}</span>
                  <BaseText as="small" color="soft" className={styles.bodyText}>
                    {action.note}
                  </BaseText>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroActions}>
            <BaseLink
              external={false}
              href="/feed.html"
              className={clsx(styles.button, styles.buttonPrimary)}
            >
              {t('help.toDashboard')}
            </BaseLink>
          </div>
        </section>
      </main>
      <CopyrightFooter />
    </>
  );
}
