# frozen_string_literal: true

class User < ApplicationRecord
  # extends ..................................................................................................

  # includes .................................................................................................

  # constants ................................................................................................

  # class methods ............................................................................................
  class << self
  end

  # relationships ............................................................................................

  # validations ..............................................................................................
  validates :session_id, presence: true
  validates :count, numericality: true

  # callbacks (caution: side effects) ........................................................................

  # scopes (composable queries) ..............................................................................

  # additional config (accepts_nested_attribute_for, etc.) ...................................................

  # public instance methods ..................................................................................

  # protected instance methods ...............................................................................

  # private instance methods .................................................................................
end
