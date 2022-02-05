<?php
/**
 * @file
 * Contains \Drupal\scd\Controller\ConfigDownloader.
 */
namespace Drupal\scd\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Config\StorageInterface;
use Drupal\Core\Serialization\Yaml;
use Symfony\Component\HttpFoundation\Response;

class ConfigDownloader extends ControllerBase {
  public function download($config_machine_name) {
    // Load the configuration.
    $immutable_config = \Drupal::config($config_machine_name);
    $config_data = $immutable_config->get();

    // Convert it to YML.
    $config_yml = Yaml::encode($config_data);

    // Modify the page response to trigger download of this config YML.
    $filename = $config_machine_name . '.yml';
    $response = new Response();
    $response->headers->set('Content-Type', 'text/plain');
    $response->headers->set('Content-Disposition', 'attachment; filename="' . $filename . '"');
    $response->setContent($config_yml);

    return $response;
  }
}
