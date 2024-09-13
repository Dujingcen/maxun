import React, { createContext, useContext, useState } from 'react';

export interface TextStep {
    id: number;
    type: 'text';
    label: string;
    data: string;
    selectorObj: SelectorObject;
}

interface ScreenshotStep {
    id: number;
    type: 'screenshot';
    fullPage: boolean;
}

export interface ListStep {
    id: number;
    type: 'list';
    listSelector: string;
    fields: { [key: string]: TextStep };
    pagination?: {
        type: string;
        selector: string;
    };
    limit?: number;
}

type BrowserStep = TextStep | ScreenshotStep | ListStep;

export interface SelectorObject {
    selector: string;
    tag?: string;
    attribute?: string;
    [key: string]: any;
}

interface BrowserStepsContextType {
    browserSteps: BrowserStep[];
    addTextStep: (label: string, data: string, selectorObj: SelectorObject) => void;
    addListStep: (listSelector: string, fields: { [key: string]: TextStep }, listId: number, pagination?: { type: string; selector: string }, limit?: number) => void
    addScreenshotStep: (fullPage: boolean) => void;
    deleteBrowserStep: (id: number) => void;
    updateBrowserTextStepLabel: (id: number, newLabel: string) => void;
}

const BrowserStepsContext = createContext<BrowserStepsContextType | undefined>(undefined);

export const BrowserStepsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [browserSteps, setBrowserSteps] = useState<BrowserStep[]>([]);

    const addTextStep = (label: string, data: string, selectorObj: SelectorObject) => {
        setBrowserSteps(prevSteps => [
            ...prevSteps,
            { id: Date.now(), type: 'text', label, data, selectorObj }
        ]);
    };

    const addListStep = (listSelector: string, newFields: { [key: string]: TextStep }, listId: number, pagination?: { type: string; selector: string }, limit?: number) => {
        setBrowserSteps(prevSteps => {
            const existingListStepIndex = prevSteps.findIndex(
                step => step.type === 'list' && step.id === listId
            );
            if (existingListStepIndex !== -1) {
                // Update the existing ListStep with new fields
                const updatedSteps = [...prevSteps];
                const existingListStep = updatedSteps[existingListStepIndex] as ListStep;
                updatedSteps[existingListStepIndex] = {
                    ...existingListStep,
                    fields: { ...existingListStep.fields, ...newFields },
                    pagination: pagination,
                    limit: limit,
                };
                return updatedSteps;
            } else {
                // Create a new ListStep
                return [
                    ...prevSteps,
                    { id: listId, type: 'list', listSelector, fields: newFields, pagination, limit }
                ];
            }
        });
    };

    const addScreenshotStep = (fullPage: boolean) => {
        setBrowserSteps(prevSteps => [
            ...prevSteps,
            { id: Date.now(), type: 'screenshot', fullPage }
        ]);
    };

    const deleteBrowserStep = (id: number) => {
        setBrowserSteps(prevSteps => prevSteps.filter(step => step.id !== id));
    };

    const updateBrowserTextStepLabel = (id: number, newLabel: string) => {
        setBrowserSteps(prevSteps =>
            prevSteps.map(step =>
                step.id === id ? { ...step, label: newLabel } : step
            )
        );
    };

    return (
        <BrowserStepsContext.Provider value={{
            browserSteps,
            addTextStep,
            addListStep,
            addScreenshotStep,
            deleteBrowserStep,
            updateBrowserTextStepLabel,
        }}>
            {children}
        </BrowserStepsContext.Provider>
    );
};

export const useBrowserSteps = () => {
    const context = useContext(BrowserStepsContext);
    if (!context) {
        throw new Error('useBrowserSteps must be used within a BrowserStepsProvider');
    }
    return context;
};