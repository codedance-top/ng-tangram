import { InjectionToken } from '@angular/core';

import { NtNotifierConfig, NtNotifierOptions } from './notifier-config';

// tslint:disable variable-name

/**
 * Injection Token for notifier options
 */
export const NT_NOTIFIER_OPTIONS: InjectionToken<NtNotifierOptions>
	= new InjectionToken<NtNotifierOptions>('nt-notifier-options');

/**
 * Injection Token for notifier configuration
 */
export const NT_NOTIFIER_CONFIG: InjectionToken<NtNotifierConfig>
	= new InjectionToken<NtNotifierConfig>('nt-notifier-config');

// tslint:enable variable-name

