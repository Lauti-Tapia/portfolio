'use client';

import Accordion from './Accordion';
import { useLanguage } from '../context/LanguageContext';

interface TranslationPoints {
  [key: string]: string[];
}

export default function PowerBIDescription() {
  const { t } = useLanguage();

  const bigFivePointsRaw = t('projects.powerbi.description.analysis.bigFive.points');
  const othersPointsRaw = t('projects.powerbi.description.analysis.others.points');

  const bigFivePoints = Array.isArray(bigFivePointsRaw) ? bigFivePointsRaw : [];
  const othersPoints = Array.isArray(othersPointsRaw) ? othersPointsRaw : [];

  return (
    <div className="space-y-4 max-w-4xl mx-auto mb-8">
      <Accordion title={t('projects.powerbi.description.title') as string}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              📝 {t('projects.powerbi.description.technical.title') as string}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t('projects.powerbi.description.technical.content') as string}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              📊 {t('projects.powerbi.description.analysis.title') as string}
            </h3>
            <p className="text-gray-300 mb-4">
              {t('projects.powerbi.description.analysis.intro') as string}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-md font-semibold text-blue-300 mb-2">
                  🔵 {t('projects.powerbi.description.analysis.bigFive.title') as string}
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {bigFivePoints.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-yellow-300 mb-2">
                  🟡 {t('projects.powerbi.description.analysis.others.title') as string}
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {othersPoints.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  );
} 