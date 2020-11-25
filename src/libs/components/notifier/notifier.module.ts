import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NtNotifierAnimation } from './notifier-animation';
import { NtNotifierConfig, NtNotifierOptions } from './notifier-config';
import { NtNotifierContainerComponent } from './notifier-container.component';
import { NtNotifierQueue } from './notifier-queue';
import { NT_NOTIFIER_CONFIG, NT_NOTIFIER_OPTIONS } from './notifier-tokens';
import { NtNotifierComponent } from './notifier.component';
import { NtNotifier } from './notifier.service';

/**
 * Factory for a notifier configuration with custom options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @param   options - Custom notifier options
 * @returns - Notifier configuration as result
 */
export function notifierCustomConfigFactory(options: NtNotifierOptions): NtNotifierConfig {
	return new NtNotifierConfig(options);
}

/**
 * Factory for a notifier configuration with default options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @returns - Notifier configuration as result
 */
export function notifierDefaultConfigFactory(): NtNotifierConfig {
	return new NtNotifierConfig({});
}

/**
 * Notifier module
 */
@NgModule({
	declarations: [NtNotifierContainerComponent, NtNotifierComponent],
	exports: [NtNotifierContainerComponent],
	imports: [CommonModule],
	providers: [
		NtNotifierAnimation,
		NtNotifier,
		NtNotifierQueue,
		{ provide: NT_NOTIFIER_CONFIG, useFactory: notifierDefaultConfigFactory },
	],
})
export class NtNotifierModule {
	/**
	 * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
	 *
	 * @param   [options={}] - Custom notifier options
	 * @returns - Notifier module with custom providers
	 */
	public static withConfig(options: NtNotifierOptions = {}): ModuleWithProviders<NtNotifierModule> {
		return {
			ngModule: NtNotifierModule,
			providers: [
				// Provide the options itself upfront (as we need to inject them as dependencies -- see below)
				{
					provide: NT_NOTIFIER_OPTIONS,
					useValue: options,
				},

				// Provide a custom notifier configuration, based on the given notifier options
				{
					deps: [NT_NOTIFIER_OPTIONS],
					provide: NT_NOTIFIER_CONFIG,
					useFactory: notifierCustomConfigFactory,
				},
			],
		};
	}
}
